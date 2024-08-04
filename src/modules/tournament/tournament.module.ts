import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TournamentTeamRepository } from './repo/tournament-team.repository';
import { TournamentParticipantRepository } from './repo/tournament-participant.repository';
import { TournamentRepository } from './repo/tournament.repository';

@Module({
  controllers: [TournamentController],
  providers: [
    TournamentService,
    TournamentRepository,
    TournamentTeamRepository,
    TournamentParticipantRepository,
  ],
})
export class TournamentModule {}
