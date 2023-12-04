import { Module } from '@nestjs/common';
import { RestaurantDishController } from './restaurantDish.controller';
import { RestaurantDishService } from './restaurantDish.service';

@Module({
  controllers: [RestaurantDishController],
  providers: [RestaurantDishService],
})
export class RestaurantDishModule {}
