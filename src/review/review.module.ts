import { Module } from '@nestjs/common';
import { KnexModule } from '../global/modules/knex.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [KnexModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
