import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { FilesAzureService } from '../../libs/uploads/azure/azure.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [MediaController],
  providers: [MediaService, ConfigService, FilesAzureService],
})
export class MediaModule {}
