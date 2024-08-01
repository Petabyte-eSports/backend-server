import { Injectable } from '@nestjs/common';
import { AbstractRepo } from '../../../libs/db/AbstractRepo';
import { UserEntity } from '../entity/user.entity';
import { UserWalletEntity } from '../entity/user-wallet.entity';

@Injectable()
export class UserWalletRepository extends AbstractRepo<UserWalletEntity> {
  constructor() {
    super(UserWalletEntity);
  }

  async addUserWallet(user: UserEntity) {
    const userWallet = new UserWalletEntity();
    userWallet.user_id = user.id;
    return this.save(userWallet);
  }
}
