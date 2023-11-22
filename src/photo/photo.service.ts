import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreatePhotoDto } from './dto/create_photo.dto';

@Injectable()
export class PhotoService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getPhotos() {
    return await this.knex.select('*').from('photo');
  }

  async getPhotoByID(id: string) {
    return await this.knex.select('*').from('photo').where('photo_id', id);
  }

  async getReviewPhotos(id: string) {
    return await this.knex
      .select('*')
      .from('photo')
      .leftOuterJoin('review', 'review.review_id', 'review.review_id')
      .leftOuterJoin(
        'photo_category',
        'photo.photo_category_id',
        'photo_category.photo_category_id',
      )
      .where('photo_category.name', 'Review')
      .where('review.restaurant_id', id);
  }

  async getMenuPhotos(id: string) {
    return await this.knex
      .select('*')
      .from('photo')
      .leftOuterJoin('review', 'review.review_id', 'review.review_id')
      .leftOuterJoin(
        'photo_category',
        'photo.photo_category_id',
        'photo_category.photo_category_id',
      )
      .where('photo_category.name', 'Menu')
      .where('review.restaurant_id', id);
  }

  async createPhoto(photo: CreatePhotoDto) {
    return await this.knex
      .insert({
        ...photo,
        created_at: new Date(),
        active: true,
      })
      .into('photo')
      .returning('*');
  }

  async deletePhoto(id: string) {
    return await this.knex('photo')
      .update({ active: false })
      .where('photo_id', id)
      .returning('*');
  }
}
