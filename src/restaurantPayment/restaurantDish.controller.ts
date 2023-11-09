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
  async getRestaurantDishByID(@Param() id: string): Promise<RestaurantDish> {
    return (await this.restaurantDishService.getRestaurantDishByID(id))[0];
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
  async deleteRestaurantDish(@Param() id: string) {
    const dishFound = await this.restaurantDishService.getRestaurantDishByID(
      id,
    );
    if (dishFound) {
      return (await this.restaurantDishService.deleteRestaurantDish(id))[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This restaurant dish cannot be found',
      });
    }
  }
}
