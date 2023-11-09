import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './interfaces/restaurant.interface';
import { RestaurantService } from './restaurant.service';

@Controller('api/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async getRestaurants(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantService.getRestaurants();
    return Promise.all(
      restaurants.map(async (restaurant) => ({
        ...restaurant,
        averageRating: await this.restaurantService.getAverageRating(
          restaurant.restaurant_id,
        ),
        reviewCount: await this.restaurantService.getReviewCount(
          restaurant.restaurant_id,
        ),
      })),
    );
  }

  @Get(':id')
  async getRestaurantByID(@Param() id: string): Promise<Restaurant> {
    const restaurant = (await this.restaurantService.getRestaurantByID(id))[0];
    return {
      ...restaurant,
      averageRating: await this.restaurantService.getAverageRating(
        restaurant.restaurant_id,
      ),
      reviewCount: await this.restaurantService.getReviewCount(
        restaurant.restaurant_id,
      ),
    };
  }

  @Post()
  async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return (
      await this.restaurantService.createRestaurant(createRestaurantDto)
    )[0];
  }

  @Put(':id')
  async updateRestaurant(
    @Param() id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    const restaurantFound = await this.restaurantService.getRestaurantByID(id);
    if (restaurantFound) {
      return (
        await this.restaurantService.updateRestaurant(id, updateRestaurantDto)
      )[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This restaurant cannot be found',
      });
    }
  }

  @Delete(':id')
  async deleteRestaurant(@Param() id: string) {
    const restaurantFound = await this.restaurantService.getRestaurantByID(id);
    if (restaurantFound) {
      return (await this.restaurantService.deleteRestaurant(id))[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This restaurant cannot be found',
      });
    }
  }
}