import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../../../libs/db/AbstractRepo';
import { CountryEntity } from '../entity/country.entity';

@Injectable()
export class CountryRepository extends AbstractRepo<CountryEntity> {
  constructor() {
    super(CountryEntity);
  }
}
