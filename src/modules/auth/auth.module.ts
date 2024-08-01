import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/repositories/user.repository';
import { UserWalletRepository } from '../user/repositories/user_wallet.repository';
import { SendEmailConsumer } from './consumer/send-email.consumer';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import { Config } from '../../libs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: Config.JWT_SECRET,
      signOptions: { expiresIn: '3457d' },
    }),
    BullModule.registerQueue({
      name: Config.CREATE_USER_QUEUE,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    UserWalletRepository,
    SendEmailConsumer,
  ],
})
export class AuthModule {}
