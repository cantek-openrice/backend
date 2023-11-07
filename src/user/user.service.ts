import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Knex } from 'knex';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users: User[] = [];
  constructor(@Inject('knex') private readonly knex: Knex) {}

  async getUsers() {
    return await this.knex.select('*').from('users');
  }

  async getUserById(id: string) {
    return await this.knex.select('*').from('users').where('id', id);
  }

  async createUser(user: CreateUserDto) {
    return await this.knex
      .insert({
        ...user,
        created_at: new Date(),
        modified_at: new Date(),
        active: true,
      })
      .into('users')
      .returning('*');
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return await this.knex
      .update({ ...user, modified_at: new Date() })
      .from('users')
      .where('id', id)
      .returning('*');
  }

  async deleteUser(id: string) {
    return await this.knex
      .update({ active: false, modified_at: new Date() })
      .from('users')
      .where('id', id)
      .returning('*');
  }
}
