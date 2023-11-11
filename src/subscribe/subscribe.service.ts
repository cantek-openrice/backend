import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';

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
        created_at: new Date(),
        modified_at: new Date(),
        active: true,
      })
      .into('subscribe')
      .returning('*');
  }

  async deleteSubscribe(id: string) {
    return await this.knex('subscribe')
      .update({ active: false, modified_at: new Date() })
      .where('subscribe_id', id)
      .returning('*');
  }
}
