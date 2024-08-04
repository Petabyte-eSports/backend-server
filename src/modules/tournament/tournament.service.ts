import { HttpStatus, Injectable } from '@nestjs/common';
import { TournamentRepository } from './repo/tournament.repository';
import {
  CreateJoinTournamentDto,
  CreateTournamentDto,
  JoinTeamDto,
} from './dto/tournament.dto';
import { TournamentEntity } from './entity/tournament.entity';
import { BaseResponse } from '../../libs/response/base_response';
import { PaginationDto } from '../../libs/pagination/pagination';
import { TournamentParticipantRepository } from './repo/tournament-participant.repository';
import { TournamentParticipant } from './entity/tournament-participant.entity';
import { TournamentTeamRepository } from './repo/tournament-team.repository';
import { TournamentTeamEntity } from './entity/tournament-team.entity';

@Injectable()
export class TournamentService {
  constructor(
    private readonly tournamentRepository: TournamentRepository,
    private readonly tournamentParticipantRepository: TournamentParticipantRepository,
    private readonly tournamentTeamRepository: TournamentTeamRepository,
  ) {}

  //create with CreateTournamentDto
  async createTournament(userId: string, data: CreateTournamentDto) {
    //add user_id to tournament data
    data['user_id'] = userId;
    await this.tournamentRepository.save(<TournamentEntity>data);
    return BaseResponse.success(
      null,
      'Tournament created successfully',
      HttpStatus.CREATED,
    );
  }

  async getTournament(user_id: string, data: PaginationDto) {
    const pageSize = parseInt(data.limit, 10) || 10;
    const currentPage = parseInt(data.page, 10) || 1;
    const where = {
      country_id: data.keywords || null,
      user_id,
    };

    const tournaments = await this.tournamentRepository.findPaginated(
      pageSize,
      currentPage,
      where,
      { created_at: 'DESC' },
    );
    return BaseResponse.success(
      tournaments,
      'Tournaments fetched successfully',
      HttpStatus.OK,
    );
  }

  async getTournamentById(user_id: string, id: string) {
    const tournament = await this.tournamentRepository.find([
      { id },
      { user_id },
    ]);
    return BaseResponse.success(
      tournament,
      'Tournament fetched successfully',
      HttpStatus.OK,
    );
  }

  async updateTournament(id: string, data: CreateTournamentDto) {
    await this.tournamentRepository.findOneAndUpdate(
      { id },
      <TournamentEntity>data,
    );
    return BaseResponse.success(
      null,
      'Tournament updated successfully',
      HttpStatus.OK,
    );
  }

  async deleteTournament(id: string) {
    await this.tournamentRepository.findOneAndUpdate(
      { id },
      { is_deleted: true },
    );
    return BaseResponse.success(
      null,
      'Tournament deleted successfully',
      HttpStatus.OK,
    );
  }

  async joinTournament(
    userId: string,
    id: string,
    data: CreateJoinTournamentDto,
  ) {
    //check if tournament exists
    const tournament = await this.tournamentRepository.findOne({ id });
    if (!tournament) {
      return BaseResponse.error('Tournament not found', HttpStatus.NOT_FOUND);
    }
    //check if end date is greater than current date
    if (new Date(tournament.end_date) < new Date()) {
      return BaseResponse.error('Tournament has ended', HttpStatus.BAD_REQUEST);
    }
    //block created user from joining
    if (tournament.user_id === userId) {
      return BaseResponse.error(
        'You cannot join your own tournament',
        HttpStatus.BAD_REQUEST,
      );
    }
    //check if user has already joined
    const participant =
      await this.tournamentParticipantRepository.findOneByMultipleConditions([
        { user_id: userId, tournament_id: id },
      ]);
    if (participant) {
      return BaseResponse.error(
        'You have already joined this tournament',
        HttpStatus.BAD_REQUEST,
      );
    }
    //check if participant limit has been reached
    const participants = await this.tournamentParticipantRepository.countWhere({
      tournament_id: id,
    });
    if (participants >= tournament.participant_limit) {
      return BaseResponse.error(
        'Participant limit reached',
        HttpStatus.BAD_REQUEST,
      );
    }

    //add user_id to data
    const newParticipant = new TournamentParticipant();
    newParticipant.user_id = userId;
    newParticipant.tournament_id = id;
    newParticipant.gametag = data.game_tags;
    newParticipant.is_qualify = false;
    await this.tournamentParticipantRepository.save(newParticipant);
    return BaseResponse.success(
      null,
      'Tournament joined successfully',
      HttpStatus.OK,
    );
  }

  async addTeamToTournament(id: string, data: JoinTeamDto) {
    //check if tournament exists
    const tournament =
      await this.tournamentTeamRepository.findOneByMultipleConditions(
        [{ tournament_id: id }, { user_id: data.user_id }],
        {},
      );
    if (tournament) {
      return BaseResponse.error(
        'You have already added a team to this tournament',
        HttpStatus.BAD_REQUEST,
      );
    }
    //add to item
    data['tournament_id'] = id;
    await this.tournamentTeamRepository.save(<TournamentTeamEntity>data);
    return BaseResponse.success(
      null,
      'Team added to tournament successfully',
      HttpStatus.CREATED,
    );
  }

  async removeTeamFromTournament(id: string) {
    //check if tournament exists
    const tournament =
      await this.tournamentTeamRepository.findOneByMultipleConditions(
        [{ tournament_id: id }],
        {},
      );
    if (!tournament) {
      return BaseResponse.error(
        'Team not found in this tournament',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.tournamentTeamRepository.findOneAndDelete({ id: tournament.id });
    return BaseResponse.success(
      null,
      'Team removed from tournament successfully',
      HttpStatus.OK,
    );
  }

  async updateTeamRole(id: string, data: JoinTeamDto) {
    //check if tournament exists
    const tournament =
      await this.tournamentTeamRepository.findOneByMultipleConditions(
        [{ id }],
        {},
      );
    if (!tournament) {
      return BaseResponse.error(
        'Team not found in this tournament',
        HttpStatus.BAD_REQUEST,
      );
    }
    //update role
    await this.tournamentTeamRepository.findOneAndUpdate(
      { id },
      <TournamentTeamEntity>data,
    );
    return BaseResponse.success(
      null,
      'Team role updated successfully',
      HttpStatus.OK,
    );
  }

  async leaveTournament(id: string) {
    await this.tournamentRepository.findOneAndDelete({ id });
    return BaseResponse.success(
      null,
      'Tournament left successfully',
      HttpStatus.OK,
    );
  }

  async getTeam(id: string, data: PaginationDto) {
    const pageSize = parseInt(data.limit, 10) || 10;
    const currentPage = parseInt(data.page, 10) || 1;
    const where = {
      tournament_id: id,
    };

    const tournaments = await this.tournamentTeamRepository.findPaginated(
      pageSize,
      currentPage,
      where,
      { created_at: 'DESC' },
    );
    return BaseResponse.success(
      tournaments,
      'Tournaments fetched successfully',
      HttpStatus.OK,
    );
  }
}
