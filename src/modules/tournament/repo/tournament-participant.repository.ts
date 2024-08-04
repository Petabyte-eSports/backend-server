import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../../../libs/db/AbstractRepo';
import { TournamentParticipant } from '../entity/tournament-participant.entity';

@Injectable()
export class TournamentParticipantRepository extends AbstractRepo<TournamentParticipant> {
  constructor() {
    super(TournamentParticipant);
  }
}
