import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../../../libs/db/AbstractRepo';
import { StateEntity } from '../entity/state.entity';

@Injectable()
export class StateRepository extends AbstractRepo<StateEntity> {
  constructor() {
    super(StateEntity);
  }
}
