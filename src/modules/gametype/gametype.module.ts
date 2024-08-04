import { Module } from '@nestjs/common';
import { GametypeService } from './gametype.service';
import { GametypeController } from './gametype.controller';
import { GameTypeRepository } from './repo/gametype.repository';

@Module({
  controllers: [GametypeController],
  providers: [GametypeService, GameTypeRepository],
})
export class GametypeModule {}
