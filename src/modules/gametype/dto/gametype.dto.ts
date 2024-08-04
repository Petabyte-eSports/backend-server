import {
  IsString,
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsJSON,
} from 'class-validator';

export class GameTypeDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  game_type_name: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsJSON()
  @IsOptional()
  tags?: any;
}
