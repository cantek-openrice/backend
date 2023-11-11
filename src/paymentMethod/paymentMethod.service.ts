import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PaymentMethodService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getPaymentMethods() {
    return await this.knex.select('*').from('payment_method');
  }

  async getPaymentMethodByID(id: string) {
    return await this.knex
      .select('*')
      .from('payment_method')
      .where('payment_method_id', id);
  }
}
