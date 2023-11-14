import { Module } from '@nestjs/common';
import { KnexModule } from '../global/modules/knex.module';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';

@Module({
  imports: [KnexModule],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
