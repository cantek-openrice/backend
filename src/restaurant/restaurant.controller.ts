import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create_restaurant.dto';
import { UpdateRestaurantDto } from './dto/update_restaurant.dto';
import { RestaurantService } from './restaurant.service';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RestaurantEntity } from './dto/entity/restaurant.entity';
import { UserRole } from '../global/utils/enums/UserRole';

@ApiTags('restaurant')
@Controller('api/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'role', enum: UserRole, required: false })
  async getRestaurants(
    @Query('limit', new DefaultValuePipe('100'), ParseIntPipe)
    limit: number,
    @Query('offset', new DefaultValuePipe('0'), ParseIntPipe)
    offset: number,
    @Query('name', new DefaultValuePipe(''))
    name: string,
  ): Promise<RestaurantEntity[]> {
    let restaurantsFiltered;
    const restaurants = await this.restaurantService.getRestaurants(
      limit,
      offset,
    );

    if (name) {
      restaurantsFiltered = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(name.toLowerCase()),
      );

      return Promise.all(
        restaurantsFiltered.map(async (restaurant) => ({
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

  @Get('id/:restaurant_id')
  @ApiParam({ name: 'restaurant_id', required: true, type: String })
  async getRestaurantByID(
    @Param() params: { restaurant_id: string },
  ): Promise<RestaurantEntity> {
    const restaurant = (
      await this.restaurantService.getRestaurantByID(params.restaurant_id)
    )[0];
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
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<RestaurantEntity> {
    return (
      await this.restaurantService.createRestaurant(createRestaurantDto)
    )[0];
  }

  @Put('id/:restaurant_id')
  @ApiParam({ name: 'restaurant_id', required: true, type: String })
  async updateRestaurant(
    @Param() params: { restaurant_id: string },
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<RestaurantEntity | { message: string }> {
    const restaurantFound = await this.restaurantService.getRestaurantByID(
      params.restaurant_id,
    );
    if (restaurantFound) {
      return (
        await this.restaurantService.updateRestaurant(
          params.restaurant_id,
          updateRestaurantDto,
        )
      )[0];
    } else {
      return { message: 'This restaurant cannot be found' };
    }
  }

  @Delete('id/:restaurant_id')
  @ApiParam({ name: 'restaurant_id', required: true, type: String })
  async deleteRestaurant(
    @Param() params: { restaurant_id: string },
  ): Promise<RestaurantEntity | { message: string }> {
    const restaurantFound = await this.restaurantService.getRestaurantByID(
      params.restaurant_id,
    );
    if (restaurantFound) {
      return (
        await this.restaurantService.deleteRestaurant(params.restaurant_id)
      )[0];
    } else {
      return { message: 'This restaurant cannot be found' };
    }
  }
}
