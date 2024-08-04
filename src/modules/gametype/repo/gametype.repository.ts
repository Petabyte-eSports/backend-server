import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../../../libs/db/AbstractRepo';
import { GameTypeEntity } from '../entity/gametype.entity';

@Injectable()
export class GameTypeRepository extends AbstractRepo<GameTypeEntity> {
  constructor() {
    super(GameTypeEntity);
  }
}
