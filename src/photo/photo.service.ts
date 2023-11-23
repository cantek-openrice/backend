import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreatePhotoDto } from './dto/create_photo.dto';

@Injectable()
export class PhotoService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getPhotos() {
    return await this.knex.select('*').from('review_photo');
  }

  async getPhotoByID(id: string) {
    const reviewPhoto = await this.knex
      .select('*')
      .from('review_photo')
      .where('review_photo_id', id);
    const menuPhoto = await this.knex
      .select('*')
      .from('menu_photo')
      .where('menu_photo_id', id);
    if (reviewPhoto.length > 0) {
      return reviewPhoto;
    } else {
      return menuPhoto;
    }
  }

  async getReviewPhotos(id: string) {
    return await this.knex
      .select('*')
      .from('review_photo')
      .leftOuterJoin('review', 'review_photo.review_id', 'review.review_id')
      .andWhere('review.restaurant_id', id)
      .andWhere('review_photo.active', true);
  }

  async getMenuPhotos(id: string) {
    return await this.knex
      .select('*')
      .from('menu_photo')
      .leftOuterJoin(
        'restaurant',
        'menu_photo.restaurant_id',
        'restaurant.restaurant_id',
      )
      .andWhere('menu_photo.restaurant_id', id)
      .andWhere('menu_photo.active', true);
  }

  async createPhoto(photo: CreatePhotoDto) {
    return await this.knex
      .insert({
        ...photo,
        created_at: new Date(),
        active: true,
      })
      .into('review_photo')
      .returning('*');
  }

  async deletePhoto(id: string) {
    return await this.knex('review_photo')
      .update({ active: false })
      .where('review_photo_id', id)
      .returning('*');
  }
}
