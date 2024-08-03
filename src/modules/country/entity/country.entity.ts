import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { BaseEntity } from '../../../libs/db/BaseEntity';

@Entity('countries')
export class CountryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  flag: string;

  @Column()
  phoneCode: string;
}
