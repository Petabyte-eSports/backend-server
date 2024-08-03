import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserFollowerRepository } from './repositories/user_follower_repository';
import { UserWalletRepository } from './repositories/user_wallet.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFollowerRepository: UserFollowerRepository,
    private readonly userWalletRepository: UserWalletRepository,
  ) {}

  // async getMe(userId: string) {
  //   const user = await this.userRepository.findOne({ id: userId });
  //   const countFollowers = await this.userFollowerRepository.countWhere({
  //     followingId: userId,
  //   });
  //   const countFollowing = await this.userFollowerRepository.countWhere({
  //     followerId: userId,
  //   });
  //   const totalPost = await this.postRepository.countWhere({ user_id: userId });
  //   const subscription = await this.subscribeUserRepository.find([
  //     { status: SubscriptionStatus.ACTIVE, user_id: userId },
  //   ]);
  //   user['followers'] = countFollowers;
  //   user['following'] = countFollowing;
  //   user['total_post'] = totalPost;
  //   user['subscribed'] = subscription[0];
  //   return BaseResponse.success(
  //     user,
  //     'User fetched successfully',
  //     HttpStatus.OK,
  //   );
  // }
}
