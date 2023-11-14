import { Module } from '@nestjs/common';
import { KnexModule } from '../global/modules/knex.module';
import { RestaurantDishController } from './restaurantDish.controller';
import { RestaurantDishService } from './restaurantDish.service';

@Module({
  imports: [KnexModule],
  controllers: [RestaurantDishController],
  providers: [RestaurantDishService],
})
export class RestaurantDishModule {}
