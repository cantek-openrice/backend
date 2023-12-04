import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getUsers() {
    return await this.knex.select('*').from('user');
  }

  async getUserByID(id: string) {
    return await this.knex.select('*').from('user').where('user_id', id);
  }

  async createUser(user: CreateUserDto, fileExtension?: string) {
    const userDetail = await this.knex
      .insert({
        ...user,
        role: user.role ? user.role : 'User',
        active: true,
        created_at: new Date(),
        modified_at: new Date(),
      })
      .into('user')
      .returning('*');
    if (fileExtension) {
      return await this.knex('user')
        .update({
          profile_picture_url: `${process.env.IMAGE_PREFIX}/user/${userDetail[0].user_id}/profile_picture_url.${fileExtension}`,
        })
        .where('user_id', userDetail[0].user_id)
        .returning('*');
    }
    return userDetail;
  }

  async updateUserProfile(
    id: string,
    user: UpdateUserDto,
    fileExtension: string,
  ) {
    if (fileExtension) {
      return await this.knex('user')
        .update({
          ...user,
          profile_picture_url: `${process.env.IMAGE_PREFIX}/user/${id}/profile_picture_url.${fileExtension}`,
          modified_at: new Date(),
        })
        .where('user_id', id)
        .returning('*');
    } else {
      return await this.knex('user')
        .update({
          ...user,
          modified_at: new Date(),
        })
        .where('user_id', id)
        .returning('*');
    }
  }

  async deleteUser(id: string) {
    return await this.knex('user')
      .update({ active: false, modified_at: new Date() })
      .where('user_id', id)
      .returning('*');
  }
}
