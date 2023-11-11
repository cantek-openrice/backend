import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateRestaurantPaymentDto } from './dto/create-restaurantPayment.dto';

@Injectable()
export class RestaurantPaymentService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getRestaurantPayments() {
    return await this.knex.select('*').from('restaurant_payment');
  }

  async getRestaurantPaymentByID(id: string) {
    return await this.knex
      .select('*')
      .from('restaurant_payment')
      .where('restaurant_payment_id', id);
  }

  async createRestaurantPayment(restaurantPayment: CreateRestaurantPaymentDto) {
    return await this.knex
      .insert({
        ...restaurantPayment,
        created_at: new Date(),
        active: true,
      })
      .into('restaurant_payment')
      .returning('*');
  }

  async deleteRestaurantPayment(id: string) {
    return await this.knex('restaurant_payment')
      .update({ active: false, modified_at: new Date() })
      .where('restaurant_payment_id', id)
      .returning('*');
  }
}
