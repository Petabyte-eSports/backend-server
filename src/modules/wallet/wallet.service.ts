import { Injectable } from '@nestjs/common';
import { LotusService } from '../../libs/payment/lotus.internal';

@Injectable()
export class WalletService {
  constructor(private readonly lotusService: LotusService) {}

  async getBanks() {
    return await this.lotusService.getBanks();
  }
}
