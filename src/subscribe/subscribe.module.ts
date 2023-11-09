import { Module } from '@nestjs/common';
import { KnexModule } from 'src/global/modules/knex.module';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';

@Module({
  imports: [KnexModule],
  controllers: [SubscribeController],
  providers: [SubscribeService],
})
export class SubscribeModule {}
