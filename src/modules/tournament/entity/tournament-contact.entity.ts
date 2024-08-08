import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../../libs/db/BaseEntity';
import { UserEntity } from '../../user/entity/user.entity';
import { TournamentEntity } from './tournament.entity';

@Entity('tournament_contacts')
export class TournamentContact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'tournament_id' })
  tournament_id: string;

  @ManyToOne(() => TournamentEntity, { eager: true })
  @JoinColumn({ name: 'tournament_id' })
  tournament: TournamentEntity;

  @Column('uuid', { name: 'user_id' })
  user_id: string;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
