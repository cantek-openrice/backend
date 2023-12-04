import { Module } from '@nestjs/common';
import { RestaurantPaymentMethodController } from './restaurantPaymentMethod.controller';
import { RestaurantPaymentMethodService } from './restaurantPaymentMethod.service';

@Module({
  controllers: [RestaurantPaymentMethodController],
  providers: [RestaurantPaymentMethodService],
})
export class RestaurantPaymentMethodModule {}
