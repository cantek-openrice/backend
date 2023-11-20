import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateSubscribeDto } from './dto/create_subscribe.dto';

@Injectable()
export class SubscribeService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getSubscribes() {
    return await this.knex.select('*').from('subscribe');
  }

  async getSubscribeByID(id: string) {
    return await this.knex
      .select('*')
      .from('subscribe')
      .where('subscribe_id', id);
  }

  async createSubscribe(subscribe: CreateSubscribeDto) {
    return await this.knex
      .insert({
        ...subscribe,
        active: true,
        created_at: new Date(),
      })
      .into('subscribe')
      .returning('*');
  }

  async deleteSubscribe(id: string) {
    return await this.knex('subscribe')
      .update({ active: false })
      .where('subscribe_id', id)
      .returning('*');
  }
}
