import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StateEntity } from '../../state/entity/state.entity';
import { CountryEntity } from '../../country/entity/country.entity';
import { BaseEntity } from '../../../libs/db/BaseEntity';
import { GameTypeEntity } from '../../gametype/entity/gametype.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('tournaments')
export class TournamentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tournament_name' })
  tournament_name: string;

  @Column('uuid', { name: 'game_type_id' })
  game_type_id: string;

  @ManyToOne(() => GameTypeEntity, { eager: true })
  @JoinColumn({ name: 'game_type_id' })
  game_type: GameTypeEntity;

  @Column({ name: 'image_url' })
  image_url: string;

  @Column('uuid', { name: 'country_id' })
  country_id: string;

  @ManyToOne(() => CountryEntity, { eager: true })
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @Column('uuid', { name: 'user_id' })
  user_id: string;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('uuid', { name: 'state_id' })
  state_id: string;

  @ManyToOne(() => StateEntity, { eager: true })
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  @Column('text')
  about: string;

  @Column('text')
  rules: string;

  @Column('jsonb')
  prizes: any;

  @Column('jsonb')
  platforms: any;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  entry_fee: number;

  @Column()
  entry_fee_type: string;

  @Column('int')
  participant_limit: number;

  @Column('boolean', { default: false })
  is_promote: boolean;

  @Column('boolean', { default: false })
  is_verified: boolean;

  @Column('timestamp')
  start_date: Date;

  @Column('timestamp')
  end_date: Date;

  @Column()
  status: string;

  @Column('boolean', { default: false })
  is_deleted: boolean;
}
