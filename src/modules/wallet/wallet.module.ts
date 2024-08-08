import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { LotusService } from '../../libs/payment/lotus.internal';

@Module({
  controllers: [WalletController],
  providers: [WalletService, LotusService],
})
export class WalletModule {}
