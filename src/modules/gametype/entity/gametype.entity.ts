import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../../libs/db/BaseEntity';

@Entity('game_types')
export class GameTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'game_type_name' })
  game_type_name: string;

  @Column({ name: 'image_url' })
  image_url: string;

  @Column('json', { name: 'tags' })
  tags: any; // You can define a specific type if you know the structure of your tags JSON.

  @Column('boolean', { name: 'is_deleted', default: false })
  is_deleted: boolean;
}
