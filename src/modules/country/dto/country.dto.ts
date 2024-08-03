import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  flag: string;

  @IsString()
  @IsNotEmpty()
  phoneCode: string;
}
