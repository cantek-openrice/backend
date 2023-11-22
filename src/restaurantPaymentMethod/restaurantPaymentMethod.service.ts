import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateRestaurantPaymentMethodDto } from './dto/create_restaurant_payment_method.dto';

@Injectable()
export class RestaurantPaymentMethodService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getRestaurantPaymentMethods() {
    return await this.knex.select('*').from('restaurant_payment_method');
  }

  async getRestaurantPaymentMethodByID(id: string) {
    return await this.knex
      .select('*')
      .from('restaurant_payment_method')
      .where('restaurant_payment_method_id', id);
  }

  async createRestaurantPaymentMethod(
    restaurantPaymentMethod: CreateRestaurantPaymentMethodDto,
  ) {
    return await this.knex
      .insert({
        ...restaurantPaymentMethod,
        created_at: new Date(),
        active: true,
      })
      .into('restaurant_payment_method')
      .returning('*');
  }

  async deleteRestaurantPaymentMethod(id: string) {
    return await this.knex('restaurant_payment_method')
      .update({ active: false })
      .where('restaurant_payment_method_id', id)
      .returning('*');
  }
}
