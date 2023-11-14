import { Module } from '@nestjs/common';
import { KnexModule } from '../global/modules/knex.module';
import { RestaurantPaymentController } from './restaurantPayment.controller';
import { RestaurantPaymentService } from './restaurantPayment.service';

@Module({
  imports: [KnexModule],
  controllers: [RestaurantPaymentController],
  providers: [RestaurantPaymentService],
})
export class RestaurantPaymentModule {}
