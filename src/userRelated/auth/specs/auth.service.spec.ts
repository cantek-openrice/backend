import * as dotenv from 'dotenv';
import * as jwtSimple from 'jwt-simple';
import Knex from 'knex';
import knexConfigs from '../../../../knexfile';
import { AuthService } from '../auth.service';
import { expectedUsers } from './expectedUsers';

dotenv.config();

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('AuthService', () => {
  let authService: AuthService;
  let userIDs: { user_id: string }[];

  beforeAll(async () => {
    authService = new AuthService(knex);
  });

  beforeEach(async () => {
    userIDs = await knex
      .insert({
        username: expectedUsers[0].username,
        email: expectedUsers[0].email,
        password: expectedUsers[0].password,
        role: expectedUsers[0].role,
      })
      .into('user')
      .returning('user_id');
  });

  describe('login', () => {
    it('should return that user after login', async () => {
      const result = await authService.login(expectedUsers[0].username);
      const userFiltered = result.filter(
        (user) => user.user_id === userIDs[0].user_id,
      );

      expect(userFiltered).toMatchObject([
        {
          username: expectedUsers[0].username,
          email: expectedUsers[0].email,
          password: expectedUsers[0].password,
          role: expectedUsers[0].role,
        },
      ]);
    });
  });

  describe('validateToken', () => {
    it('should return that user after validating the token', async () => {
      const token = jwtSimple.encode(
        expectedUsers[0],
        process.env.JWT_SECRET as string,
      );

      const result = await authService.validateToken(token);
      expect(result).toMatchObject({
        username: expectedUsers[0].username,
        email: expectedUsers[0].email,
        password: expectedUsers[0].password,
        role: expectedUsers[0].role,
      });
    });

    it('should print the error if the token cannot be validated', async () => {
      console.log = jest.fn();
      const token = '123';

      const result = await authService.validateToken(token);
      expect(console.log).toBeCalledTimes(1);
      expect(result).toBeNull();
    });
  });

  afterEach(async () => {
    const reviews = await knex
      .select('*')
      .from('review')
      .whereIn(
        'user_id',
        userIDs.map((userID) => userID.user_id),
      );
    const subscribes = await knex
      .select('*')
      .from('subscribe')
      .whereIn(
        'user_id',
        userIDs.map((userID) => userID.user_id),
      );

    if (reviews.length === 0 && subscribes.length === 0) {
      await knex('user')
        .whereIn(
          'user_id',
          userIDs.map((userID) => userID.user_id),
        )
        .del();
    }
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
