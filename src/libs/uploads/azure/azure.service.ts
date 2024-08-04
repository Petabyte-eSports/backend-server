import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { uuid } from 'uuidv4';

@Injectable()
export class FilesAzureService {
  constructor(private readonly configService: ConfigService) {}
  private containerName: string;

  private async getBlobServiceInstance() {
    const connectionString = this.configService.get('CONNECTION_STRING');
    const blobClientService =
      await BlobServiceClient.fromConnectionString(connectionString);
    return blobClientService;
  }

  private async getBlobClient(imageName: string): Promise<BlockBlobClient> {
    const blobService = await this.getBlobServiceInstance();
    const containerName = this.containerName;
    const containerClient = blobService.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(imageName);

    return blockBlobClient;
  }

  public async uploadFile(file: Express.Multer.File, containerName: string) {
    let fileUrl: string; // Declare fileUrl here

    try {
      this.containerName = containerName;
      const extension = file.originalname.split('.').pop();
      const file_name = uuid() + '.' + extension;
      const blockBlobClient = await this.getBlobClient(file_name);
      fileUrl = blockBlobClient.url; // Assign value to fileUrl
      // set content type
      const contentType = file.mimetype;
      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: { blobContentType: contentType },
      });
    } catch (error) {
      console.log(error);
    }

    return fileUrl;
  }

  public async uploadFile2(file: Express.Multer.File, containerName: string) {
    try {
      this.containerName = containerName;
      const extension = file.originalname.split('.').pop();
      const file_name = uuid() + '.' + extension;
      const blockBlobClient = await this.getBlobClient(file_name);
      const fileUrl = blockBlobClient.url;

      // Convert buffer to base64
      const conciseBuffer = Buffer.from(file.buffer['data']).toString('base64');
      const bufferFromBase64 = Buffer.from(conciseBuffer, 'base64');

      // Set content type
      const contentType = file.mimetype;

      // Upload data to Azure Storage
      await blockBlobClient.uploadData(bufferFromBase64, {
        blobHTTPHeaders: { blobContentType: contentType },
      });

      return fileUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Re-throw the error to indicate that the upload failed
    }
  }

  public async deleteFile(file_name: string, containerName: string) {
    try {
      this.containerName = containerName;
      const blockBlobClient = await this.getBlobClient(file_name);
      await blockBlobClient.deleteIfExists();
    } catch (error) {
      console.log(error);
    }
  }
}
