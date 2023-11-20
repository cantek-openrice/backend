import { Inject, Injectable } from '@nestjs/common';
import * as jwtSimple from 'jwt-simple';
import { Knex } from 'knex';

@Injectable()
export class AuthService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async login(username: string) {
    return await this.knex.select('*').from('user').where('username', username);
  }

  validateToken(token: string) {
    try {
      return jwtSimple.decode(token, process.env.JWT_SECRET as string);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
