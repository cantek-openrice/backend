import Knex from 'knex';
import knexConfigs from '../../../../knexfile';
import { UserService } from '../user.service';
import { expectedUsers } from './expectedUsers';

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('UserService', () => {
  let userService: UserService;
  let userIDs: { user_id: string }[];

  beforeAll(async () => {
    userService = new UserService(knex);
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

  describe('getUsers', () => {
    it('should return users', async () => {
      const result = await userService.getUsers();
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

  describe('getUserByID', () => {
    it('should return user of that user id', async () => {
      const result = await userService.getUserByID(userIDs[0].user_id);
      expect(result).toMatchObject([
        {
          username: expectedUsers[0].username,
          email: expectedUsers[0].email,
          password: expectedUsers[0].password,
          role: expectedUsers[0].role,
        },
      ]);
    });
  });

  describe('createUser', () => {
    it('should return that user after creating a user', async () => {
      const result = await userService.createUser({
        username: expectedUsers[0].username,
        email: expectedUsers[0].email,
        password: expectedUsers[0].password,
        role: expectedUsers[0].role,
      });

      userIDs.push({ user_id: result[0].user_id });

      expect(result).toMatchObject([
        {
          username: expectedUsers[0].username,
          email: expectedUsers[0].email,
          password: expectedUsers[0].password,
          role: expectedUsers[0].role,
        },
      ]);
    });
  });

  describe('updateUser', () => {
    it('should return that user after updating a user', async () => {
      const result = await userService.updateUser(userIDs[0].user_id, {
        username: 'ttiimmothy',
      });
      expect(result).toMatchObject([
        {
          username: 'ttiimmothy',
          email: expectedUsers[0].email,
          password: expectedUsers[0].password,
          role: expectedUsers[0].role,
        },
      ]);
    });
  });

  describe('deleteUser', () => {
    it('should return that user after changing the active state of a user', async () => {
      const result = await userService.deleteUser(userIDs[0].user_id);
      expect(result).toMatchObject([
        {
          username: expectedUsers[0].username,
          email: expectedUsers[0].email,
          password: expectedUsers[0].password,
          role: expectedUsers[0].role,
        },
      ]);
    });
  });

  afterEach(async () => {
    const restaurantOwners = await knex
      .select('*')
      .from('restaurant_owner')
      .whereIn(
        'user_id',
        userIDs.map((userID) => userID.user_id),
      );

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

    if (
      restaurantOwners.length === 0 &&
      reviews.length === 0 &&
      subscribes.length === 0
    ) {
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
