import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PhotoCategoryService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getPhotoCategories() {
    return await this.knex.select('*').from('photo_category');
  }

  async getPhotoCategoryByID(id: string) {
    return await this.knex
      .select('*')
      .from('photo_category')
      .where('photo_category_id', id);
  }
}
