import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../../../libs/db/AbstractRepo';
import { TournamentTeamEntity } from '../entity/tournament-team.entity';

@Injectable()
export class TournamentTeamRepository extends AbstractRepo<TournamentTeamEntity> {
  constructor() {
    super(TournamentTeamEntity);
  }
}
