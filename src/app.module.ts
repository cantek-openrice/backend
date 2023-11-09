import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from './global/modules/knex.module';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DishModule } from './dish/dish.module';
import { RestaurantDishModule } from './restaurantDish/restaurantDish.module';
import { DistrictModule } from './district/district.module';
import { PhotoCategoryModule } from './photoCategory/photoCategory.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    KnexModule,
    UserModule,
    RestaurantModule,
    DishModule,
    RestaurantDishModule,
    DistrictModule,
    PhotoCategoryModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
