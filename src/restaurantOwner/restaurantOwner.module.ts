import { Module } from '@nestjs/common';
import { RestaurantOwnerController } from './restaurantOwner.controller';
import { RestaurantOwnerService } from './restaurantOwner.service';

@Module({
  controllers: [RestaurantOwnerController],
  providers: [RestaurantOwnerService],
})
export class RestaurantOwnerModule {}
