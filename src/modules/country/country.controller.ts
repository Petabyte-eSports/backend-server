import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/country.dto';
import { PaginationDto } from 'src/libs/pagination/pagination';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('create')
  async createCountry(@Body() data: CreateCountryDto) {
    return this.countryService.createCountry(data);
  }

  @Get('get')
  async getCountry(@Query() data: PaginationDto) {
    return this.countryService.getCountry(data);
  }

  @Get('get/:id')
  async getCountryById(@Param('id') id: string) {
    return this.countryService.getCountryById(id);
  }

  @Post('update/:id')
  async updateCountry(@Param('id') id: string, @Body() data: CreateCountryDto) {
    return this.countryService.updateCountry(id, data);
  }

  @Delete('delete/:id')
  async deleteCountry(@Param('id') id: string) {
    return this.countryService.deleteCountry(id);
  }
}
