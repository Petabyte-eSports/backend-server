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
import { StateService } from './state.service';
import { CreateStateDto } from './dto/state.dto';
import { PaginationDto } from '../../libs/pagination/pagination';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post('create')
  createState(@Body() createStateDto: CreateStateDto) {
    return this.stateService.createState(createStateDto);
  }

  @Get('get-state')
  getState(@Query() pagination: PaginationDto) {
    return this.stateService.getState(pagination);
  }

  @Get('get-state/:id')
  getStateById(@Query('id') id: string) {
    return this.stateService.getStateById(id);
  }

  @Put('update-state/:id')
  updateState(@Param('id') id: string, @Body() createStateDto: CreateStateDto) {
    return this.stateService.updateState(id, createStateDto);
  }

  @Delete('delete-state/:id')
  deleteState(@Param('id') id: string) {
    return this.stateService.deleteState(id);
  }
}
