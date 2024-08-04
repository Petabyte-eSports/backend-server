import { HttpStatus, Injectable } from '@nestjs/common';
import { FilesAzureService } from '../../libs/uploads/azure/azure.service';
import { BaseResponse } from '../../libs/response/base_response';

@Injectable()
export class MediaService {
  constructor(private readonly fileService: FilesAzureService) {}

  async uploadFile(files: Array<Express.Multer.File>) {
    const productImages = [];
    const failedUploads = [];

    for (const file of files) {
      try {
        const fileUrl = await this.fileService.uploadFile(
          file,
          process.env.AZURE_STORAGE_CONTAINER_NAME,
        );
        productImages.push({ image_url: fileUrl });
      } catch (err) {
        console.error(`Error uploading file ${file.originalname}:`, err);
        failedUploads.push(file.originalname);
      }
    }

    if (failedUploads.length > 0) {
      return BaseResponse.error(
        `Failed to upload files: ${failedUploads.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return BaseResponse.success(
      { productImages },
      'Files uploaded successfully',
      HttpStatus.CREATED,
    );
  }
}
