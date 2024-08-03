import {
  IsString,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { PostViewType } from '../entity/post-view-entity';

export class PostDto {
  @IsString()
  caption: string;

  @IsArray()
  hashtags: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  images: string[];
}

export class CommentDto {
  @IsString()
  comment: string;
}

export class PostViewDto {
  @IsEnum(PostViewType) // Validate that type is a valid PostViewType
  type: PostViewType;
}
