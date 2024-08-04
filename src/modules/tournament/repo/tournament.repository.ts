import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../../../libs/db/AbstractRepo';
import { TournamentEntity } from '../entity/tournament.entity';

@Injectable()
export class TournamentRepository extends AbstractRepo<TournamentEntity> {
  constructor() {
    super(TournamentEntity);
  }
}
