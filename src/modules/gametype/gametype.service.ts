import { HttpStatus, Injectable } from '@nestjs/common';
import { GameTypeRepository } from './repo/gametype.repository';
import { BaseResponse } from '../../libs/response/base_response';
import { GameTypeDto } from './dto/gametype.dto';
import { GameTypeEntity } from './entity/gametype.entity';
import { PaginationDto } from '../../libs/pagination/pagination';

@Injectable()
export class GametypeService {
  constructor(private readonly gameTypeRepository: GameTypeRepository) {}

  //create a new game type
  async createGameType(data: GameTypeDto) {
    await this.gameTypeRepository.save(<GameTypeEntity>data);
    return BaseResponse.success(
      null,
      'Game type created successfully',
      HttpStatus.CREATED,
    );
  }

  //get all game types
  async getGameType(data: PaginationDto) {
    const pageSize = parseInt(data.limit, 10) || 10;
    const currentPage = parseInt(data.page, 10) || 1;
    let where = {};
    if (data.name) {
      where = { game_type_name: data.name };
    }
    const gameTypes = await this.gameTypeRepository.findPaginated(
      pageSize,
      currentPage,
      where,
      { created_at: 'DESC' },
    );
    return BaseResponse.success(
      gameTypes,
      'Game types fetched successfully',
      HttpStatus.OK,
    );
  }

  //update
  async updateGameType(id: string, data: GameTypeDto) {
    await this.gameTypeRepository.findOneAndUpdate({ id }, data);
    return BaseResponse.success(
      null,
      'Game type updated successfully',
      HttpStatus.OK,
    );
  }

  //delete
  async deleteGameType(id: string) {
    await this.gameTypeRepository.findOneAndDelete({ id });
    return BaseResponse.success(
      null,
      'Game type deleted successfully',
      HttpStatus.OK,
    );
  }

  //get game type by id
  async getGameTypeById(id: string) {
    const gameType = await this.gameTypeRepository.findOne({ id });
    return BaseResponse.success(
      gameType,
      'Game type fetched successfully',
      HttpStatus.OK,
    );
  }
}
