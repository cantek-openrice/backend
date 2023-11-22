import { Module } from '@nestjs/common';
import { KnexModule } from '../global/modules/knex.module';
import { RestaurantPaymentMethodController } from './restaurantPaymentMethod.controller';
import { RestaurantPaymentMethodService } from './restaurantPaymentMethod.service';

@Module({
  imports: [KnexModule],
  controllers: [RestaurantPaymentMethodController],
  providers: [RestaurantPaymentMethodService],
})
export class RestaurantPaymentMethodModule {}
