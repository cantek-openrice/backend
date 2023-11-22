import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './userRelated/user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DishModule } from './dish/dish.module';
import { RestaurantDishModule } from './restaurantDish/restaurantDish.module';
import { PhotoModule } from './photo/photo.module';
import { RestaurantOwnerModule } from './restaurantOwner/restaurantOwner.module';
import { RestaurantPaymentMethodModule } from './restaurantPaymentMethod/restaurantPaymentMethod.module';
import { ReviewModule } from './review/review.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { DistrictModule } from './district/district.module';
import { PhotoCategoryModule } from './photoCategory/photoCategory.module';
import { AuthModule } from './userRelated/auth/auth.module';
import { PaymentMethodModule } from './paymentMethod/paymentMethod.module';
import { KnexModule } from './global/modules/knex.module';
import { CspModule } from './global/csp/csp.module';
import { StaticModule } from './global/static/static.module';

@Module({
  imports: [
    CspModule,
    StaticModule,
    KnexModule,
    UserModule,
    RestaurantModule,
    DishModule,
    RestaurantDishModule,
    DistrictModule,
    PhotoModule,
    PhotoCategoryModule,
    RestaurantDishModule,
    RestaurantOwnerModule,
    RestaurantPaymentMethodModule,
    ReviewModule,
    SubscribeModule,
    AuthModule,
    PaymentMethodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
