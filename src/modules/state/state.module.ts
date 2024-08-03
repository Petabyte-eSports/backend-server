import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { StateRepository } from './repo/state.repository';

@Module({
  controllers: [StateController],
  providers: [StateService, StateRepository],
})
export class StateModule {}
