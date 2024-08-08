import {
  IsUUID,
  IsString,
  IsDate,
  IsInt,
  IsDecimal,
  IsArray,
  IsObject,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PrizesDto {
  @IsString()
  first_place: string;

  @IsString()
  second_place: string;

  @IsString()
  third_place: string;
}

export class CreateTournamentDto {
  @IsString()
  tournament_name: string;

  @IsUUID()
  game_type_id: string;

  @IsString()
  image_url: string;

  @IsUUID()
  country_id: string;

  @IsUUID()
  state_id: string;

  @IsString()
  about: string;

  @IsString()
  rules: string;

  @IsObject()
  @Type(() => PrizesDto)
  prizes: PrizesDto;

  @IsArray()
  @IsString({ each: true })
  platforms: string[];

  @IsDecimal()
  entry_fee: number;

  @IsString()
  entry_fee_type: string;

  @IsInt()
  participant_limit: number;

  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @IsDate()
  @Type(() => Date)
  end_date: Date;
}

export class CreateJoinTournamentDto {
  @IsString()
  @IsNotEmpty()
  game_tags: string;
}

export class JoinTeamDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  user_id?: string;
}
