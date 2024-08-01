import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../libs/db/BaseEntity';
import { Country } from '../../generic/country.entity';
import { State } from '../../generic/state.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'uuid' })
  country_id: string;

  @Column({ type: 'uuid' })
  state_id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar' })
  email: string;

  @Index({ unique: true })
  @Column({ type: 'varchar' })
  username: string;

  @Index({ unique: true })
  @Column({ type: 'varchar' })
  phone: string;

  @Index({ unique: true })
  @Column({ type: 'varchar' })
  user_id: string;

  @Column({ type: 'text', nullable: true })
  notification_token: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'varchar', default: 'other' })
  gender: string;

  @Column({ type: 'varchar', default: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg' })
  avatar: string;

  @Column({ type: 'int', default: 0 })
  point: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_email_verified: boolean;

  @Column({ type: 'boolean', default: false })
  is_phone_verified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  email_verified_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  phone_verified_at: Date;

  @Column({ type: 'varchar', default: 'pending' })
  account_status: string;

  @Column({ type: 'varchar', default: 'novice' })
  rank: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', nullable: true })
  pin: string;

  @Column({ type: 'jsonb', nullable: true })
  kyc: object;

  @ManyToOne(() => Country, (country) => country.id, { eager: true })
  country: Country;

  @ManyToOne(() => State, (state) => state.id, { eager: true })
  state: State;

  //is_deleted
  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;
}
