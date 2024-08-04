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
import { TournamentService } from './tournament.service';
import {
  CreateJoinTournamentDto,
  CreateTournamentDto,
  JoinTeamDto,
} from './dto/tournament.dto';
import { CurrentUser } from '../user/decorator/user.decorator';
import { PaginationDto } from '../../libs/pagination/pagination';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post('create')
  createTournament(
    @CurrentUser() user: any,
    @Body() createTournamentDto: CreateTournamentDto,
  ) {
    return this.tournamentService.createTournament(
      user.id,
      createTournamentDto,
    );
  }

  @Get('get-tournament')
  getTournament(@CurrentUser() user: any, @Query() data: PaginationDto) {
    return this.tournamentService.getTournament(user.id, data);
  }

  @Get('get-tournament/:id')
  getTournamentById(@CurrentUser() user: any, @Param('id') id: string) {
    return this.tournamentService.getTournamentById(user.id, id);
  }

  @Put('update-tournament/:id')
  updateTournament(
    @Param('id') id: string,
    @Body() createTournamentDto: CreateTournamentDto,
  ) {
    return this.tournamentService.updateTournament(id, createTournamentDto);
  }

  @Delete('delete-tournament/:id')
  deleteTournament(@Param('id') id: string) {
    return this.tournamentService.deleteTournament(id);
  }

  @Put('join-tournament/:id')
  joinTournament(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() data: CreateJoinTournamentDto,
  ) {
    return this.tournamentService.joinTournament(user.id, id, data);
  }

  @Put('add-team/:id')
  addTeamToTournament(@Param('id') id: string, @Body() data: JoinTeamDto) {
    return this.tournamentService.addTeamToTournament(id, data);
  }

  @Delete('remove-team/:id')
  removeTeamFromTournament(@Param('id') id: string) {
    return this.tournamentService.removeTeamFromTournament(id);
  }

  @Put('update-team/:id')
  updateTeamRole(@Param('id') id: string, @Body() data: JoinTeamDto) {
    return this.tournamentService.updateTeamRole(id, data);
  }

  @Put('delete-team/:id')
  leaveTournament(@Param('id') id: string) {
    return this.tournamentService.leaveTournament(id);
  }

  @Get('get-team/:id')
  getTeam(@Param('id') id: string, @Query() data: PaginationDto) {
    return this.tournamentService.getTeam(id, data);
  }
}
