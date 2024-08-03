import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserFollowerRepository } from './repositories/user_follower_repository';
import { UserWalletRepository } from './repositories/user_wallet.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserFollowerRepository,
    UserWalletRepository,
  ],
})
export class UserModule {}
