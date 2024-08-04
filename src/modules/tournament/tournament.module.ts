import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TournamentTeamRepository } from './repo/tournament-team.repository';
import { TournamentParticipantRepository } from './repo/tournament-participant.repository';

@Module({
  controllers: [TournamentController],
  providers: [
    TournamentService,
    TournamentTeamRepository,
    TournamentParticipantRepository,
  ],
})
export class TournamentModule {}
