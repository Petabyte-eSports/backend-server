import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Public } from '../auth/strategy/public-strategy';

@Public()
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('banks')
  async getBanks() {
    return await this.walletService.getBanks();
  }
}
