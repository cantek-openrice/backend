import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { RestaurantDishService } from './restaurantDish.service';
import { RestaurantDish } from './interfaces/restaurantDish.interface';
import { CreateRestaurantDishDto } from './dto/create-restaurantDish.dto';

@Controller('api/restaurant/dish')
export class RestaurantDishController {
  constructor(private readonly restaurantDishService: RestaurantDishService) {}

  @Get()
  async getRestaurantDishes(): Promise<RestaurantDish[]> {
    return await this.restaurantDishService.getRestaurantDishes();
  }

  @Get(':id')
  async getRestaurantDishByID(
    @Param() params: { id: string },
  ): Promise<RestaurantDish> {
    return (
      await this.restaurantDishService.getRestaurantDishByID(params.id)
    )[0];
  }

  @Post()
  async createRestaurantDish(
    @Body() createRestaurantDishDto: CreateRestaurantDishDto,
  ) {
    return (
      await this.restaurantDishService.createRestaurantDish(
        createRestaurantDishDto,
      )
    )[0];
  }

  @Delete(':id')
  async deleteRestaurantDish(@Param() params: { id: string }) {
    const restaurantDishFound =
      await this.restaurantDishService.getRestaurantDishByID(params.id);
    if (restaurantDishFound) {
      return (
        await this.restaurantDishService.deleteRestaurantDish(params.id)
      )[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This restaurant dish cannot be found',
      });
    }
  }
}
