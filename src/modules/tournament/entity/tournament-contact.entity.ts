import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Tournament } from './tournament.entity';
import { BaseEntity } from '../../../libs/db/BaseEntity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('tournament_contacts')
export class TournamentContact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'tournament_id' })
  tournamentId: string;

  @ManyToOne(() => Tournament, { eager: true })
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
