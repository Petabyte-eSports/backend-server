import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { BaseEntity } from '../../../libs/db/BaseEntity';
import { PostImageEntity } from './post-image-entity';
import { PostCommentEntity } from './post-comment-entity';
import { PostLikeEntity } from './post-like-entity';
import { PostViewEntity } from './post-view-entity';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'user_id', nullable: false })
  user_id?: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { eager: true }) // Define the relationship to UserEntity
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column({ type: 'varchar', nullable: false })
  caption: string;

  @Column()
  is_deleted?: boolean;

  @OneToMany(() => PostImageEntity, (postImage) => postImage.post, {
    eager: true,
  })
  images?: PostImageEntity[];

  @OneToMany(
    () => PostCommentEntity,
    (postCommentEntity) => postCommentEntity.post,
    {
      eager: false,
    },
  )
  comments?: PostCommentEntity[];

  @OneToMany(() => PostLikeEntity, (postLikeEntity) => postLikeEntity.post, {
    eager: false,
  })
  likes?: PostLikeEntity[];

  @OneToMany(() => PostViewEntity, (postViewEntity) => postViewEntity.post, {
    eager: false,
  })
  views?: PostViewEntity[];
}
