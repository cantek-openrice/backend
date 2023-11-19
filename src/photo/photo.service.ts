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

  async createPhoto(photo: CreatePhotoDto) {
    return await this.knex
      .insert({
        ...photo,
        created_at: new Date(),
        modified_at: new Date(),
        active: true,
      })
      .into('photo')
      .returning('*');
  }

  async deletePhoto(id: string) {
    return await this.knex('photo')
      .update({ active: false, modified_at: new Date() })
      .where('photo_id', id)
      .returning('*');
  }
}
