import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../libs/db/BaseEntity';
import { UserEntity } from './user.entity';

@Entity('user_wallet')
export class UserWalletEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => UserEntity, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'jsonb', nullable: true })
  kyc: object;

  @Column({ type: 'varchar', nullable: true })
  account_number: string;

  @Column({ type: 'varchar', nullable: true })
  account_name: string;
}
