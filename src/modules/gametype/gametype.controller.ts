import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GametypeService } from './gametype.service';
import { GameTypeDto } from './dto/gametype.dto';
import { PaginationDto } from '../../libs/pagination/pagination';

@Controller('gametype')
export class GametypeController {
  constructor(private readonly gametypeService: GametypeService) {}

  @Post('create')
  async createCountry(@Body() data: GameTypeDto) {
    return this.gametypeService.createGameType(data);
  }

  @Get('get')
  async getCountry(@Query() data: PaginationDto) {
    return this.gametypeService.getGameType(data);
  }

  @Put('update/:id')
  async updateCountry(@Param('id') id: string, @Body() data: GameTypeDto) {
    return this.gametypeService.updateGameType(id, data);
  }

  @Delete('delete/:id')
  async deleteCountry(@Param('id') id: string) {
    return this.gametypeService.deleteGameType(id);
  }

  @Get('get/:id')
  async getCountryById(@Param('id') id: string) {
    return this.gametypeService.getGameTypeById(id);
  }
}
