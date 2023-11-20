import * as dotenv from 'dotenv';
import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { RestaurantOwnerService } from '../restaurantOwner.service';
import { expectedRestaurants } from '../../restaurant/specs/expectedRestaurants';
import { expectedDistricts } from '../../district/specs/expectedDistricts';
import { expectedUsers } from '../../userRelated/user/specs/expectedUsers';

dotenv.config();

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('RestaurantOwnerService', () => {
  let restaurantOwnerService: RestaurantOwnerService;
  let restaurantOwnerIDs: { restaurant_owner_id: string }[];
  let userIDs: { user_id: string }[];
  let districtIDs: { district_id: string }[];
  let restaurantIDs: { restaurant_id: string }[];

  beforeAll(async () => {
    restaurantOwnerService = new RestaurantOwnerService(knex);
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

    restaurantOwnerIDs = await knex
      .insert({
        user_id: userIDs[0].user_id,
        restaurant_id: restaurantIDs[0].restaurant_id,
      })
      .into('restaurant_owner')
      .returning('restaurant_owner_id');
  });

  describe('getRestaurantOwners', () => {
    it('should return restaurant owners', async () => {
      const result = await restaurantOwnerService.getRestaurantOwners();
      const restaurantOwnerFiltered = result.filter(
        (restaurantOwner) =>
          restaurantOwner.restaurant_owner_id ===
          restaurantOwnerIDs[0].restaurant_owner_id,
      );
      expect(restaurantOwnerFiltered).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
        },
      ]);
    });
  });

  describe('getRestaurantOwnerByID', () => {
    it('should return restaurant owner of that restaurant owner id', async () => {
      const result = await restaurantOwnerService.getRestaurantOwnerByID(
        restaurantOwnerIDs[0].restaurant_owner_id,
      );
      expect(result).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
        },
      ]);
    });
  });

  describe('createRestaurantOwner', () => {
    it('should return that restaurant owner after creating a restaurant owner', async () => {
      const result = await restaurantOwnerService.createRestaurantOwner({
        user_id: userIDs[0].user_id,
        restaurant_id: restaurantIDs[0].restaurant_id,
      });

      restaurantOwnerIDs.push({
        restaurant_owner_id: result[0].restaurant_owner_id,
      });

      expect(result).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
        },
      ]);
    });
  });

  describe('updateRestaurantOwner', () => {
    it('should return that restaurant owner after updating a restaurant owner', async () => {
      const result = await restaurantOwnerService.updateRestaurantOwner(
        restaurantOwnerIDs[0].restaurant_owner_id,
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
        },
      );

      expect(result).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
        },
      ]);
    });
  });

  describe('deleteRestaurantOwner', () => {
    it('should return that restaurant owner after changing the active state of a restaurant owner', async () => {
      const result = await restaurantOwnerService.deleteRestaurantOwner(
        restaurantOwnerIDs[0].restaurant_owner_id,
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
    await knex('restaurant_owner')
      .whereIn(
        'restaurant_owner_id',
        restaurantOwnerIDs.map(
          (restaurantOwnerID) => restaurantOwnerID.restaurant_owner_id,
        ),
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
