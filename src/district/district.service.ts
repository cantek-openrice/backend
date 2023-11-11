import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class DistrictService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getDistricts() {
    return await this.knex.select('*').from('district');
  }

  async getDistrictByID(id: string) {
    return await this.knex
      .select('*')
      .from('district')
      .where('district_id', id);
  }
}
