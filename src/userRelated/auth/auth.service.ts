import { Inject, Injectable } from '@nestjs/common';
import jwtSimple from 'jwt-simple';
import { Knex } from 'knex';

@Injectable()
export class AuthService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async login(username: string) {
    if (await this.knex.select('*').where('username', username)) {
      return await this.knex.select('*').where('username', username);
    } else {
      return await this.knex.select('*').where('email', username);
    }
  }

  validateToken(token: string): any {
    try {
      return jwtSimple.decode(token, process.env.JWT_SECRET as string);
    } catch (e) {
      return null;
    }
  }
}
