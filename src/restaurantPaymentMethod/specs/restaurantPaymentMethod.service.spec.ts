import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { RestaurantPaymentMethodService } from '../restaurantPaymentMethod.service';
import { expectedRestaurants } from '../../restaurant/specs/expectedRestaurants';
import { expectedDistricts } from '../../district/specs/expectedDistricts';
import { expectedPaymentMethods } from '../../paymentMethod/specs/expectedPaymentMethods';

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('RestaurantPaymentMethodService', () => {
  let restaurantPaymentMethodService: RestaurantPaymentMethodService;
  let restaurantPaymentMethodIDs: {
    restaurant_payment_method_id: string;
  }[];
  let paymentMethodIDs: { payment_method_id: string }[];
  let districtIDs: { district_id: string }[];
  let restaurantIDs: { restaurant_id: string }[];

  beforeAll(async () => {
    restaurantPaymentMethodService = new RestaurantPaymentMethodService(knex);
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

    restaurantPaymentMethodIDs = await knex
      .insert({
        restaurant_id: restaurantIDs[0].restaurant_id,
        payment_method_id: paymentMethodIDs[0].payment_method_id,
      })
      .into('restaurant_payment_method')
      .returning('restaurant_payment_method_id');
  });

  describe('getRestaurantPaymentMethods', () => {
    it('should return restaurant payment methods', async () => {
      const result =
        await restaurantPaymentMethodService.getRestaurantPaymentMethods();
      const restaurantPaymentMethodFiltered = result.filter(
        (restaurantPaymentMethod) =>
          restaurantPaymentMethod.restaurant_payment_method_id ===
          restaurantPaymentMethodIDs[0].restaurant_payment_method_id,
      );
      expect(restaurantPaymentMethodFiltered).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          payment_method_id: paymentMethodIDs[0].payment_method_id,
        },
      ]);
    });
  });

  describe('getRestaurantPaymentMethodByID', () => {
    it('should return restaurant payment method of that restaurant payment method id', async () => {
      const result =
        await restaurantPaymentMethodService.getRestaurantPaymentMethodByID(
          restaurantPaymentMethodIDs[0].restaurant_payment_method_id,
        );
      expect(result).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          payment_method_id: paymentMethodIDs[0].payment_method_id,
        },
      ]);
    });
  });

  describe('createRestaurantPaymentMethod', () => {
    it('should return that restaurant payment method after creating a restaurant payment method', async () => {
      const result =
        await restaurantPaymentMethodService.createRestaurantPaymentMethod({
          restaurant_id: restaurantIDs[0].restaurant_id,
          payment_method_id: paymentMethodIDs[0].payment_method_id,
        });

      restaurantPaymentMethodIDs.push({
        restaurant_payment_method_id: result[0].restaurant_payment_method_id,
      });

      expect(result).toMatchObject([
        {
          restaurant_id: restaurantIDs[0].restaurant_id,
          payment_method_id: paymentMethodIDs[0].payment_method_id,
        },
      ]);
    });
  });

  describe('deleteRestaurantPaymentMethod', () => {
    it('should return that restaurant payment method after changing the active state of a restaurant payment method', async () => {
      const result =
        await restaurantPaymentMethodService.deleteRestaurantPaymentMethod(
          restaurantPaymentMethodIDs[0].restaurant_payment_method_id,
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
    await knex('restaurant_payment_method')
      .whereIn(
        'restaurant_payment_method_id',
        restaurantPaymentMethodIDs.map(
          (restaurantPaymentMethodMethodID) =>
            restaurantPaymentMethodMethodID.restaurant_payment_method_id,
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
