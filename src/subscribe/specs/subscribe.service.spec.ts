import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { SubscribeService } from '../subscribe.service';
import { expectedUsers } from '../../userRelated/user/specs/expectedUsers';
import { expectedRestaurants } from '../../restaurant/specs/expectedRestaurants';
import { expectedDistricts } from '../../district/specs/expectedDistricts';

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('SubscribeService', () => {
  let subscribeService: SubscribeService;
  let subscribeIDs: { subscribe_id: string }[];
  let userIDs: { user_id: string }[];
  let districtIDs: { district_id: string }[];
  let restaurantIDs: { restaurant_id: string }[];

  beforeAll(async () => {
    subscribeService = new SubscribeService(knex);
  });

  beforeEach(async () => {
    districtIDs = await knex
      .insert({
        name: expectedDistricts[0].name,
      })
      .into('district')
      .returning('district_id');

    userIDs = await knex
      .insert({
        username: expectedUsers[0].username,
        email: expectedUsers[0].email,
        password: expectedUsers[0].password,
        role: expectedUsers[0].role,
      })
      .into('user')
      .returning('user_id');

    restaurantIDs = await knex
      .insert({
        name: expectedRestaurants[0].name,
        address: expectedRestaurants[0].address,
        district_id: districtIDs[0].district_id,
        latitude: expectedRestaurants[0].latitude,
        longitude: expectedRestaurants[0].longitude,
        postal_code: expectedRestaurants[0].postal_code,
        phone: expectedRestaurants[0].phone,
        intro: expectedRestaurants[0].intro,
        opening_hours: expectedRestaurants[0].opening_hours,
      })
      .into('restaurant')
      .returning('restaurant_id');

    subscribeIDs = await knex
      .insert({
        user_id: userIDs[0].user_id,
        restaurant_id: restaurantIDs[0].restaurant_id,
      })
      .into('subscribe')
      .returning('subscribe_id');
  });

  describe('getSubscribes', () => {
    it('should return subscribes', async () => {
      const result = await subscribeService.getSubscribes();
      const subscribeFiltered = result.filter(
        (subscribe) => subscribe.subscribe_id === subscribeIDs[0].subscribe_id,
      );
      expect(subscribeFiltered).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
        },
      ]);
    });
  });

  describe('getSubscribeByID', () => {
    it('should return subscribe of that subscribe id', async () => {
      const result = await subscribeService.getSubscribeByID(
        subscribeIDs[0].subscribe_id,
      );
      expect(result).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
        },
      ]);
    });
  });

  describe('createSubscribe', () => {
    it('should return that subscribe after creating a subscribe', async () => {
      const result = await subscribeService.createSubscribe({
        user_id: userIDs[0].user_id,
        restaurant_id: restaurantIDs[0].restaurant_id,
      });

      subscribeIDs.push({ subscribe_id: result[0].subscribe_id });

      expect(result).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
        },
      ]);
    });
  });

  describe('deleteSubscribe', () => {
    it('should return that subscribe after changing the active state of a subscribe', async () => {
      const result = await subscribeService.deleteSubscribe(
        subscribeIDs[0].subscribe_id,
      );
      expect(result).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
        },
      ]);
    });
  });

  afterEach(async () => {
    await knex('subscribe')
      .whereIn(
        'subscribe_id',
        subscribeIDs.map((subscribeID) => subscribeID.subscribe_id),
      )
      .del();

    await knex('restaurant')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      )
      .del();

    await knex('user')
      .whereIn(
        'user_id',
        userIDs.map((userID) => userID.user_id),
      )
      .del();

    await knex('district')
      .whereIn(
        'district_id',
        districtIDs.map((districtID) => districtID.district_id),
      )
      .del();
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
