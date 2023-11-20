import * as dotenv from 'dotenv';
import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { RestaurantPaymentService } from '../restaurantPayment.service';
import { expectedRestaurants } from '../../restaurant/specs/expectedRestaurants';
import { expectedDistricts } from '../../district/specs/expectedDistricts';
import { expectedPaymentMethods } from '../../paymentMethod/specs/expectedPaymentMethods';

dotenv.config();

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('RestaurantPaymentService', () => {
  let restaurantPaymentService: RestaurantPaymentService;
  let restaurantPaymentIDs: { restaurant_payment_id: string }[];
  let paymentMethodIDs: { payment_method_id: string }[];
  let districtIDs: { district_id: string }[];
  let restaurantIDs: { restaurant_id: string }[];

  beforeAll(async () => {
    restaurantPaymentService = new RestaurantPaymentService(knex);
  });

  beforeEach(async () => {
    districtIDs = await knex
      .insert({
        name: expectedDistricts[0].name,
      })
      .into('district')
      .returning('district_id');

    paymentMethodIDs = await knex
      .insert({
        name: expectedPaymentMethods[0].name,
      })
      .into('payment_method')
      .returning('payment_method_id');

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

    restaurantPaymentIDs = await knex
      .insert({
        restaurant_id: restaurantIDs[0].restaurant_id,
        payment_method_id: paymentMethodIDs[0].payment_method_id,
      })
      .into('restaurant_payment')
      .returning('restaurant_payment_id');
  });

  describe('getRestaurantPayments', () => {
    it('should return restaurant payments', async () => {
      const result = await restaurantPaymentService.getRestaurantPayments();
      const restaurantPaymentFiltered = result.filter(
        (restaurantPayment) =>
          restaurantPayment.restaurant_payment_id ===
          restaurantPaymentIDs[0].restaurant_payment_id,
      );
      expect(restaurantPaymentFiltered).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          payment_method_id: paymentMethodIDs[0].payment_method_id,
        },
      ]);
    });
  });

  describe('getRestaurantPaymentByID', () => {
    it('should return restaurant payment of that restaurant payment id', async () => {
      const result = await restaurantPaymentService.getRestaurantPaymentByID(
        restaurantPaymentIDs[0].restaurant_payment_id,
      );
      expect(result).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          payment_method_id: paymentMethodIDs[0].payment_method_id,
        },
      ]);
    });
  });

  describe('createRestaurantPayment', () => {
    it('should return that restaurant payment after creating a restaurant payment', async () => {
      const result = await restaurantPaymentService.createRestaurantPayment({
        restaurant_id: restaurantIDs[0].restaurant_id,
        payment_method_id: paymentMethodIDs[0].payment_method_id,
      });

      restaurantPaymentIDs.push({
        restaurant_payment_id: result[0].restaurant_payment_id,
      });

      expect(result).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          payment_method_id: paymentMethodIDs[0].payment_method_id,
        },
      ]);
    });
  });

  describe('deleteRestaurantPayment', () => {
    it('should return that restaurant payment after changing the active state of a restaurant payment', async () => {
      const result = await restaurantPaymentService.deleteRestaurantPayment(
        restaurantPaymentIDs[0].restaurant_payment_id,
      );
      expect(result).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          payment_method_id: paymentMethodIDs[0].payment_method_id,
        },
      ]);
    });
  });

  afterEach(async () => {
    await knex('restaurant_payment')
      .whereIn(
        'restaurant_payment_id',
        restaurantPaymentIDs.map(
          (restaurantPaymentID) => restaurantPaymentID.restaurant_payment_id,
        ),
      )
      .del();

    await knex('restaurant')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      )
      .del();

    await knex('payment_method')
      .whereIn(
        'payment_method_id',
        paymentMethodIDs.map((userID) => userID.payment_method_id),
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
