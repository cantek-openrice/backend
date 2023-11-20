import * as dotenv from 'dotenv';
import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { RestaurantDishService } from '../restaurantDish.service';
import { expectedRestaurants } from '../../restaurant/specs/expectedRestaurants';
import { expectedDistricts } from '../../district/specs/expectedDistricts';
import { expectedDishes } from '../../dish/specs/expectedDishes';

dotenv.config();

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('RestaurantDishService', () => {
  let restaurantDishService: RestaurantDishService;
  let restaurantDishIDs: { restaurant_dish_id: string }[];
  let dishIDs: { dish_id: string }[];
  let districtIDs: { district_id: string }[];
  let restaurantIDs: { restaurant_id: string }[];

  beforeAll(async () => {
    restaurantDishService = new RestaurantDishService(knex);
  });

  beforeEach(async () => {
    districtIDs = await knex
      .insert({
        name: expectedDistricts[0].name,
      })
      .into('district')
      .returning('district_id');

    dishIDs = await knex
      .insert({
        name: expectedDishes[0].name,
      })
      .into('dish')
      .returning('dish_id');

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

    restaurantDishIDs = await knex
      .insert({
        restaurant_id: restaurantIDs[0].restaurant_id,
        dish_id: dishIDs[0].dish_id,
      })
      .into('restaurant_dish')
      .returning('restaurant_dish_id');
  });

  describe('getRestaurantDishes', () => {
    it('should return restaurant dishes', async () => {
      const result = await restaurantDishService.getRestaurantDishes();
      const restaurantDishFiltered = result.filter(
        (restaurantDish) =>
          restaurantDish.restaurant_dish_id ===
          restaurantDishIDs[0].restaurant_dish_id,
      );
      expect(restaurantDishFiltered).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          dish_id: dishIDs[0].dish_id,
        },
      ]);
    });
  });

  describe('getRestaurantDishByID', () => {
    it('should return restaurant dish of that restaurant dish id', async () => {
      const result = await restaurantDishService.getRestaurantDishByID(
        restaurantDishIDs[0].restaurant_dish_id,
      );
      expect(result).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          dish_id: dishIDs[0].dish_id,
        },
      ]);
    });
  });

  describe('createRestaurantDish', () => {
    it('should return that restaurant dish after creating a restaurant dish', async () => {
      const result = await restaurantDishService.createRestaurantDish({
        restaurant_id: restaurantIDs[0].restaurant_id,
        dish_id: dishIDs[0].dish_id,
      });

      restaurantDishIDs.push({
        restaurant_dish_id: result[0].restaurant_dish_id,
      });

      expect(result).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          dish_id: dishIDs[0].dish_id,
        },
      ]);
    });
  });

  describe('deleteRestaurantDish', () => {
    it('should return that restaurant dish after changing the active state of a restaurant dish', async () => {
      const result = await restaurantDishService.deleteRestaurantDish(
        restaurantDishIDs[0].restaurant_dish_id,
      );
      expect(result).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          dish_id: dishIDs[0].dish_id,
        },
      ]);
    });
  });

  afterEach(async () => {
    await knex('restaurant_dish')
      .whereIn(
        'restaurant_dish_id',
        restaurantDishIDs.map(
          (restaurantDishID) => restaurantDishID.restaurant_dish_id,
        ),
      )
      .del();

    await knex('restaurant')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      )
      .del();

    await knex('dish')
      .whereIn(
        'dish_id',
        dishIDs.map((userID) => userID.dish_id),
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
