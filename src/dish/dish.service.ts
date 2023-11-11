import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class DishService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getDishes() {
    return await this.knex.select('*').from('dish');
  }

  async getDishByID(id: string) {
    return await this.knex.select('*').from('dish').where('dish_id', id);
  }
}
