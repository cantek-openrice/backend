import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateRestaurantDto } from './dto/create_restaurant.dto';
import { UpdateRestaurantDto } from './dto/update_restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getRestaurants(limit: number, offset: number) {
    return await this.knex
      .select('*')
      .from('restaurant')
      .limit(limit)
      .offset(offset);
  }

  async getRestaurantByID(id: string) {
    return await this.knex
      .select('*')
      .from('restaurant')
      .where('restaurant_id', id);
  }

  async createRestaurant(restaurant: CreateRestaurantDto) {
    const restaurantDetail = await this.knex
      .insert({
        ...restaurant.restaurant,
        created_at: new Date(),
        modified_at: new Date(),
        active: true,
      })
      .into('restaurant')
      .returning('*');

    if (restaurant.fileExtension) {
      return await this.knex('restaurant')
        .update({
          cover_image_url: `${process.env.IMAGE_PREFIX}/${restaurantDetail[0].restaurant_id}/cover_image_url.${restaurant.fileExtension}`,
          modified_at: new Date(),
        })
        .where('restaurant_id', restaurantDetail[0].restaurant_id)
        .returning('*');
    }

    return restaurantDetail;
  }

  async updateRestaurant(id: string, restaurant: UpdateRestaurantDto) {
    return await this.knex('restaurant')
      .update({ ...restaurant, modified_at: new Date() })
      .where('restaurant_id', id)
      .returning('*');
  }

  async deleteRestaurant(id: string) {
    return await this.knex('restaurant')
      .update({ active: false, modified_at: new Date() })
      .where('restaurant_id', id)
      .returning('*');
  }

  async getAverageRating(id: string) {
    const totalRating = (
      await this.knex('review').sum('rating').where('restaurant_id', id)
    )[0].sum;
    const ratingCount = (
      await this.knex('review').count('rating').where('restaurant_id', id)
    )[0].count;
    return parseInt(totalRating) / parseInt(ratingCount as string);
  }

  async getReviewCount(id: string) {
    return (
      await this.knex('review').count('rating').where('restaurant_id', id)
    )[0].count;
  }
}
