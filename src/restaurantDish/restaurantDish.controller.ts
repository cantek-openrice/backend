import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RestaurantDishService } from './restaurantDish.service';
import { CreateRestaurantDishDto } from './dto/create_restaurant_dish.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { RestaurantDishEntity } from './dto/entity/restaurantDish.entity';

@ApiTags('restaurant dish')
@Controller('api/restaurant/dish')
export class RestaurantDishController {
  constructor(private readonly restaurantDishService: RestaurantDishService) {}

  @Get()
  async getRestaurantDishes(): Promise<RestaurantDishEntity[]> {
    return await this.restaurantDishService.getRestaurantDishes();
  }

  @Get('id/:restaurant_dish_id')
  @ApiParam({ name: 'restaurant_dish_id', required: true, type: String })
  async getRestaurantDishByID(
    @Param() params: { restaurant_dish_id: string },
  ): Promise<RestaurantDishEntity> {
    return (
      await this.restaurantDishService.getRestaurantDishByID(
        params.restaurant_dish_id,
      )
    )[0];
  }

  @Post()
  async createRestaurantDish(
    @Body() createRestaurantDishDto: CreateRestaurantDishDto,
  ): Promise<RestaurantDishEntity> {
    return (
      await this.restaurantDishService.createRestaurantDish(
        createRestaurantDishDto,
      )
    )[0];
  }

  @Delete('id/:restaurant_dish_id')
  @ApiParam({ name: 'restaurant_dish_id', required: true, type: String })
  async deleteRestaurantDish(
    @Param() params: { restaurant_dish_id: string },
  ): Promise<RestaurantDishEntity | { message: string }> {
    const restaurantDishFound =
      await this.restaurantDishService.getRestaurantDishByID(
        params.restaurant_dish_id,
      );
    if (restaurantDishFound) {
      return (
        await this.restaurantDishService.deleteRestaurantDish(
          params.restaurant_dish_id,
        )
      )[0];
    } else {
      return { message: 'This restaurant dish cannot be found' };
    }
  }
}
