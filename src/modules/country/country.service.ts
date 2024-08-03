import { HttpStatus, Injectable } from '@nestjs/common';
import { CountryRepository } from './repositories/country.repository';
import { CreateCountryDto } from './dto/country.dto';
import { PaginationDto } from '../../libs/pagination/pagination';
import { BaseResponse } from '../../libs/response/base_response';
import { CountryEntity } from './entity/country.entity';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  //create country CreateCountryDto
  async createCountry(data: CreateCountryDto) {
    await this.countryRepository.save(<CountryEntity>data);
    return BaseResponse.success(
      null,
      'Country created successfully',
      HttpStatus.CREATED,
    );
  }

  async getCountry(data: PaginationDto) {
    const pageSize = parseInt(data.limit, 10) || 10;
    const currentPage = parseInt(data.page, 10) || 1;
    let where = {};
    if (data.name) {
      where = { name: data.name };
    }
    const users = await this.countryRepository.findPaginated(
      pageSize,
      currentPage,
      where,
      { created_at: 'DESC' },
    );
    return BaseResponse.success(
      users,
      'Countries fetched successfully',
      HttpStatus.OK,
    );
  }

  async getCountryById(id: string) {
    const country = await this.countryRepository.findOne({ id });
    return BaseResponse.success(
      country,
      'Country fetched successfully',
      HttpStatus.OK,
    );
  }

  async updateCountry(id: string, data: CreateCountryDto) {
    await this.countryRepository.findOneAndUpdate({ id }, data);
    return BaseResponse.success(
      null,
      'Country updated successfully',
      HttpStatus.OK,
    );
  }

  //delete
  async deleteCountry(id: string) {
    await this.countryRepository.findOneAndDelete({ id });
    return BaseResponse.success(
      null,
      'Country deleted successfully',
      HttpStatus.OK,
    );
  }
}
