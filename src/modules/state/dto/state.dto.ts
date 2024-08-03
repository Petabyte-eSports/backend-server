import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateStateDto {
  @IsUUID()
  @IsNotEmpty()
  country_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
