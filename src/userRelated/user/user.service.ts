import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getUsers() {
    return await this.knex.select('*').from('user');
  }

  async getUserByID(id: string) {
    return await this.knex.select('*').from('user').where('user_id', id);
  }

  async createUser(user: CreateUserDto) {
    return await this.knex
      .insert({
        ...user,
        role: user.role ? user.role : 'User',
        created_at: new Date(),
        modified_at: new Date(),
        active: true,
      })
      .into('user')
      .returning('*');
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return await this.knex('user')
      .update({ ...user, modified_at: new Date() })
      .where('user_id', id)
      .returning('*');
  }

  async deleteUser(id: string) {
    return await this.knex('user')
      .update({ active: false, modified_at: new Date() })
      .where('user_id', id)
      .returning('*');
  }
}
