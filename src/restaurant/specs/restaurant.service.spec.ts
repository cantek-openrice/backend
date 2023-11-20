import * as dotenv from 'dotenv';
import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { RestaurantService } from '../restaurant.service';
import { expectedDistricts } from '../../district/specs/expectedDistricts';
import { expectedRestaurants } from './expectedRestaurants';
import { expectedReviews } from '../../review/specs/expectedReviews';
import { expectedUsers } from '../../userRelated/user/specs/expectedUsers';

dotenv.config();

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('RestaurantService', () => {
  let restaurantService: RestaurantService;
  let restaurantIDs: { restaurant_id: string }[];
  let userIDs: { user_id: string }[];
  let districtIDs: { district_id: string }[];
  let reviewIDs: { review_id: string }[];

  beforeAll(async () => {
    restaurantService = new RestaurantService(knex);
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
  });

  describe('getRestaurants', () => {
    it('should return restaurants', async () => {
      const result = await restaurantService.getRestaurants(10, 0);
      const restaurantFiltered = result.filter(
        (restaurant) =>
          restaurant.restaurant_id === restaurantIDs[0].restaurant_id,
      );

      expect(restaurantFiltered).toMatchObject([
        {
          name: expectedRestaurants[0].name,
          address: expectedRestaurants[0].address,
          district_id: districtIDs[0].district_id,
          latitude: expectedRestaurants[0].latitude.toString() + '.00',
          longitude: expectedRestaurants[0].longitude.toString() + '.00',
          postal_code: expectedRestaurants[0].postal_code,
          phone: expectedRestaurants[0].phone,
          intro: expectedRestaurants[0].intro,
          opening_hours: expectedRestaurants[0].opening_hours,
        },
      ]);
    });
  });

  describe('getRestaurantByID', () => {
    it('should return restaurant of that restaurant id', async () => {
      const result = await restaurantService.getRestaurantByID(
        restaurantIDs[0].restaurant_id,
      );
      expect(result).toMatchObject([
        {
          name: expectedRestaurants[0].name,
          address: expectedRestaurants[0].address,
          district_id: districtIDs[0].district_id,
          latitude: expectedRestaurants[0].latitude.toString() + '.00',
          longitude: expectedRestaurants[0].longitude.toString() + '.00',
          postal_code: expectedRestaurants[0].postal_code,
          phone: expectedRestaurants[0].phone,
          intro: expectedRestaurants[0].intro,
          opening_hours: expectedRestaurants[0].opening_hours,
        },
      ]);
    });
  });

  describe('createRestaurant', () => {
    it('should return that restaurant after creating a restaurant', async () => {
      const result = await restaurantService.createRestaurant({
        name: expectedRestaurants[0].name,
        address: expectedRestaurants[0].address,
        district_id: districtIDs[0].district_id,
        latitude: expectedRestaurants[0].latitude,
        longitude: expectedRestaurants[0].longitude,
        postal_code: expectedRestaurants[0].postal_code,
        phone: expectedRestaurants[0].phone,
        intro: expectedRestaurants[0].intro,
        opening_hours: expectedRestaurants[0].opening_hours,
      });

      restaurantIDs.push({ restaurant_id: result[0].restaurant_id });

      expect(result).toMatchObject([
        {
          name: expectedRestaurants[0].name,
          address: expectedRestaurants[0].address,
          district_id: districtIDs[0].district_id,
          latitude: expectedRestaurants[0].latitude.toString() + '.00',
          longitude: expectedRestaurants[0].longitude.toString() + '.00',
          postal_code: expectedRestaurants[0].postal_code,
          phone: expectedRestaurants[0].phone,
          intro: expectedRestaurants[0].intro,
          opening_hours: expectedRestaurants[0].opening_hours,
        },
      ]);
    });
  });

  describe('updateRestaurant', () => {
    it('should return that restaurant after changing a restaurant', async () => {
      const result = await restaurantService.updateRestaurant(
        restaurantIDs[0].restaurant_id,
        {
          name: expectedRestaurants[0].name,
          address: expectedRestaurants[0].address,
          district_id: districtIDs[0].district_id,
          latitude: expectedRestaurants[0].latitude,
          longitude: expectedRestaurants[0].longitude,
          postal_code: expectedRestaurants[0].postal_code,
          phone: expectedRestaurants[0].phone,
          intro: expectedRestaurants[0].intro,
          opening_hours: expectedRestaurants[0].opening_hours,
          active: false,
        },
      );

      expect(result).toMatchObject([
        {
          name: expectedRestaurants[0].name,
          address: expectedRestaurants[0].address,
          district_id: districtIDs[0].district_id,
          latitude: expectedRestaurants[0].latitude.toString() + '.00',
          longitude: expectedRestaurants[0].longitude.toString() + '.00',
          postal_code: expectedRestaurants[0].postal_code,
          phone: expectedRestaurants[0].phone,
          intro: expectedRestaurants[0].intro,
          opening_hours: expectedRestaurants[0].opening_hours,
        },
      ]);
    });
  });

  describe('deleteRestaurant', () => {
    it('should return that restaurant after changing the active state of a restaurant', async () => {
      const result = await restaurantService.deleteRestaurant(
        restaurantIDs[0].restaurant_id,
      );
      expect(result).toMatchObject([
        {
          name: expectedRestaurants[0].name,
          address: expectedRestaurants[0].address,
          district_id: districtIDs[0].district_id,
          latitude: expectedRestaurants[0].latitude.toString() + '.00',
          longitude: expectedRestaurants[0].longitude.toString() + '.00',
          postal_code: expectedRestaurants[0].postal_code,
          phone: expectedRestaurants[0].phone,
          intro: expectedRestaurants[0].intro,
          opening_hours: expectedRestaurants[0].opening_hours,
        },
      ]);
    });
  });

  describe('getAverageRating', () => {
    it('should get the average rating of a specific restaurant', async () => {
      reviewIDs = await knex
        .insert({
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          title: expectedReviews[0].title,
          content: expectedReviews[0].content,
          rating: expectedReviews[0].rating,
          spending: expectedReviews[0].spending,
          visited_date: expectedReviews[0].visited_date,
        })
        .into('review')
        .returning('review_id');

      const result = await restaurantService.getAverageRating(
        restaurantIDs[0].restaurant_id,
      );

      expect(result).toBe(expectedReviews[0].rating);
    });
  });

  describe('getReviewCount', () => {
    it('should get the review count of a specific restaurant', async () => {
      reviewIDs = await knex
        .insert({
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          title: expectedReviews[0].title,
          content: expectedReviews[0].content,
          rating: expectedReviews[0].rating,
          spending: expectedReviews[0].spending,
          visited_date: expectedReviews[0].visited_date,
        })
        .into('review')
        .returning('review_id');

      const result = await restaurantService.getReviewCount(
        restaurantIDs[0].restaurant_id,
      );
      expect(result).toBe('1');
    });
  });

  afterEach(async () => {
    if (reviewIDs && reviewIDs.length > 0) {
      await knex('review')
        .whereIn(
          'review_id',
          reviewIDs.map((reviewID) => reviewID.review_id),
        )
        .del();
    }

    const restaurantDishes = await knex
      .select('*')
      .from('restaurant_dish')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      );

    const restaurantOwners = await knex
      .select('*')
      .from('restaurant_owner')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      );

    const restaurantPayments = await knex
      .select('*')
      .from('restaurant_payment')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      );

    const reviews = await knex
      .select('*')
      .from('review')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      );

    const subscribes = await knex
      .select('*')
      .from('subscribe')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      );

    if (
      restaurantDishes.length === 0 &&
      restaurantOwners.length === 0 &&
      restaurantPayments.length === 0 &&
      reviews.length === 0 &&
      subscribes.length === 0
    ) {
      await knex('restaurant')
        .whereIn(
          'restaurant_id',
          restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
        )
        .del();

      await knex('district')
        .whereIn(
          'district_id',
          districtIDs.map((districtID) => districtID.district_id),
        )
        .del();
    }

    await knex('user')
      .whereIn(
        'user_id',
        userIDs.map((userID) => userID.user_id),
      )
      .del();
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
