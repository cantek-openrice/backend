import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { RestaurantDishService } from './restaurantDish.service';
import { CreateRestaurantDishDto } from './dto/create-restaurantDish.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { RestaurantDishEntity } from './dto/entity/restaurantDish.entity';

@ApiTags('Restaurant')
// @Controller('api/restaurant/dish') //We cannot use this api since by default of nestjs the api/restaurant/:id will take over the control
@Controller('api/restaurant_dish')
export class RestaurantDishController {
  constructor(private readonly restaurantDishService: RestaurantDishService) {}

  @Get()
  async getRestaurantDishes(): Promise<RestaurantDishEntity[]> {
    return await this.restaurantDishService.getRestaurantDishes();
  }

  @Get(':restaurant_dish_id')
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

  @Delete(':restaurant_dish_id')
  @ApiParam({ name: 'restaurant_dish_id', required: true, type: String })
  async deleteRestaurantDish(
    @Param() params: { restaurant_dish_id: string },
  ): Promise<RestaurantDishEntity> {
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
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This restaurant dish cannot be found',
      });
    }
  }
}
