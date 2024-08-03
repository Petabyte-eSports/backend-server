import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CountryEntity } from '../../country/entity/country.entity';
import { BaseEntity } from '../../../libs/db/BaseEntity';

@Entity('states')
export class StateEntity extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  country_id: string;

  @ManyToOne(() => CountryEntity, (country) => country.id)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;
}
