import { HttpStatus, Injectable } from '@nestjs/common';
import { StateRepository } from './repo/state.repository';
import { CreateStateDto } from './dto/state.dto';
import { StateEntity } from './entity/state.entity';
import { BaseResponse } from '../../libs/response/base_response';
import { PaginationDto } from '../../libs/pagination/pagination';

@Injectable()
export class StateService {
  constructor(private readonly stateRepository: StateRepository) {}

  //create with CreateStateDto
  async createState(data: CreateStateDto) {
    await this.stateRepository.save(<StateEntity>data);
    return BaseResponse.success(
      null,
      'State created successfully',
      HttpStatus.CREATED,
    );
  }

  async getState(data: PaginationDto) {
    const pageSize = parseInt(data.limit, 10) || 10;
    const currentPage = parseInt(data.page, 10) || 1;
    const where = {
      country_id: data.keywords || null,
    };

    const states = await this.stateRepository.findPaginated(
      pageSize,
      currentPage,
      where,
      { created_at: 'DESC' },
    );
    return BaseResponse.success(
      states,
      'States fetched successfully',
      HttpStatus.OK,
    );
  }

  async getStateById(id: string) {
    const state = await this.stateRepository.findOne({ id });
    return BaseResponse.success(
      state,
      'State fetched successfully',
      HttpStatus.OK,
    );
  }

  async updateState(id: string, data: CreateStateDto) {
    await this.stateRepository.findOneAndUpdate({ id }, data);
    return BaseResponse.success(
      null,
      'State updated successfully',
      HttpStatus.OK,
    );
  }

  //delete
  async deleteState(id: string) {
    await this.stateRepository.findOneAndDelete({ id });
    return BaseResponse.success(
      null,
      'State deleted successfully',
      HttpStatus.OK,
    );
  }
}
