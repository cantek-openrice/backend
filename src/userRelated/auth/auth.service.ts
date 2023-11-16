import { Inject, Injectable } from '@nestjs/common';
import * as jwtSimple from 'jwt-simple';
import { Knex } from 'knex';

@Injectable()
export class AuthService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async login(username: string) {
    const foundUser = await this.knex
      .select('*')
      .from('user')
      .where('username', username);
    if (foundUser.length === 1) {
      return foundUser;
    } else {
      // return await this.knex.select('*').from('user').where('email', username);
      return undefined;
    }
  }

  validateToken(token: string) {
    try {
      return jwtSimple.decode(token, process.env.JWT_SECRET as string);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
