import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateRestaurantDishDto } from './dto/create-restaurantDish.dto';

@Injectable()
export class RestaurantDishService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getRestaurantDishes() {
    return await this.knex.select('*').from('restaurant_dish');
  }

  async getRestaurantDishByID(id: string) {
    return await this.knex
      .select('*')
      .from('restaurant_dish')
      .where('restaurant_dish_id', id);
  }

  async createRestaurantDish(restaurantDish: CreateRestaurantDishDto) {
    return await this.knex
      .insert({
        ...restaurantDish,
        created_at: new Date(),
        active: true,
      })
      .into('restaurant_dish')
      .returning('*');
  }

  async deleteRestaurantDish(id: string) {
    return await this.knex('restaurant_dish')
      .update({ active: false, modified_at: new Date() })
      .where('restaurant_dish_id', id)
      .returning('*');
  }
}
