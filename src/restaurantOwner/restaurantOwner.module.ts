import { Module } from '@nestjs/common';
import { KnexModule } from '../global/modules/knex.module';
import { RestaurantOwnerController } from './restaurantOwner.controller';
import { RestaurantOwnerService } from './restaurantOwner.service';

@Module({
  imports: [KnexModule],
  controllers: [RestaurantOwnerController],
  providers: [RestaurantOwnerService],
})
export class RestaurantOwnerModule {}
