import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from '../restaurant.controller';
import { RestaurantService } from '../restaurant.service';
import { expectedRestaurants } from './expectedRestaurants';

jest.mock('../restaurant.service');

describe('RestaurantController', () => {
  let restaurant: TestingModule;
  let restaurantController: RestaurantController;
  let restaurantService: RestaurantService;

  beforeAll(async () => {
    restaurant = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [RestaurantService],
    }).compile();

    restaurantController =
      restaurant.get<RestaurantController>(RestaurantController);
    restaurantService = restaurant.get<RestaurantService>(RestaurantService);
  });

  beforeEach(() => {
    jest
      .spyOn(restaurantService, 'getRestaurants')
      .mockResolvedValue(expectedRestaurants);
    jest
      .spyOn(restaurantService, 'getRestaurantsByDish')
      .mockResolvedValue(expectedRestaurants);
    jest
      .spyOn(restaurantService, 'getRestaurantByID')
      .mockResolvedValue(expectedRestaurants);
    jest
      .spyOn(restaurantService, 'createRestaurant')
      .mockResolvedValue(expectedRestaurants);
    jest
      .spyOn(restaurantService, 'updateRestaurant')
      .mockResolvedValue(expectedRestaurants);
    jest
      .spyOn(restaurantService, 'deleteRestaurant')
      .mockResolvedValue(expectedRestaurants);
    jest.spyOn(restaurantService, 'getAverageRating').mockResolvedValue(1);
    jest.spyOn(restaurantService, 'getReviewCount').mockResolvedValue(1);
  });

  describe('getRestaurants', () => {
    it('should return restaurants with name starts with restaurant', async () => {
      const result = await restaurantController.getRestaurants(
        1000,
        0,
        expectedRestaurants[0].name,
      );
      expect(result).toEqual([
        { ...expectedRestaurants[0], averageRating: 1, reviewCount: 1 },
      ]);
    });

    it('should return restaurants', async () => {
      const result = await restaurantController.getRestaurants(1000, 0, '');
      expect(result).toEqual([
        { ...expectedRestaurants[0], averageRating: 1, reviewCount: 1 },
      ]);
    });
  });

  describe('getRestaurantsByDish', () => {
    it('should return restaurants of that dish category', async () => {
      const result = await restaurantController.getRestaurantsByDish('Chinese');
      expect(result).toEqual([
        {
          ...expectedRestaurants[0],
          averageRating: 1,
          reviewCount: 1,
        },
      ]);
    });
  });

  describe('getRestaurantByID', () => {
    it('should return restaurant of that restaurant id', async () => {
      const result = await restaurantController.getRestaurantByID({
        restaurant_id: expectedRestaurants[0].restaurant_id,
      });
      expect(result).toEqual({
        ...expectedRestaurants[0],
        averageRating: 1,
        reviewCount: 1,
      });
    });
  });

  describe('createRestaurant', () => {
    it('should return that restaurant after creating a restaurant ', async () => {
      const result = await restaurantController.createRestaurant({
        restaurant: {
          name: expectedRestaurants[0].name,
          address: expectedRestaurants[0].address,
          district_id: expectedRestaurants[0].district_id,
          latitude: expectedRestaurants[0].latitude,
          longitude: expectedRestaurants[0].longitude,
          postal_code: expectedRestaurants[0].postal_code,
          phone: expectedRestaurants[0].phone,
          intro: expectedRestaurants[0].intro,
          opening_hours: expectedRestaurants[0].opening_hours,
          cover_image_url: expectedRestaurants[0].cover_image_url,
        },
        fileExtension: 'png',
      });

      expect(result).toEqual(expectedRestaurants[0]);
    });
  });

  describe('updateRestaurant', () => {
    it('should return that restaurant  after updating a restaurant ', async () => {
      const result = await restaurantController.updateRestaurant(
        {
          restaurant_id: expectedRestaurants[0].restaurant_id,
        },
        {
          name: expectedRestaurants[0].name,
          address: expectedRestaurants[0].address,
          district_id: expectedRestaurants[0].district_id,
          latitude: expectedRestaurants[0].latitude,
          longitude: expectedRestaurants[0].longitude,
          postal_code: expectedRestaurants[0].postal_code,
          phone: expectedRestaurants[0].phone,
          intro: expectedRestaurants[0].intro,
          opening_hours: expectedRestaurants[0].opening_hours,
          cover_image_url: expectedRestaurants[0].cover_image_url,
          active: false,
        },
      );

      expect(result).toEqual(expectedRestaurants[0]);
    });

    it('should return restaurant cannot be found message if the restaurant cannot be found', async () => {
      jest
        .spyOn(restaurantService, 'getRestaurantByID')
        .mockResolvedValue(null);

      const result = await restaurantController.updateRestaurant(
        {
          restaurant_id: expectedRestaurants[0].restaurant_id,
        },
        {
          name: expectedRestaurants[0].name,
          address: expectedRestaurants[0].address,
          district_id: expectedRestaurants[0].district_id,
          latitude: expectedRestaurants[0].latitude,
          longitude: expectedRestaurants[0].longitude,
          postal_code: expectedRestaurants[0].postal_code,
          phone: expectedRestaurants[0].phone,
          intro: expectedRestaurants[0].intro,
          opening_hours: expectedRestaurants[0].opening_hours,
          cover_image_url: expectedRestaurants[0].cover_image_url,
          active: false,
        },
      );

      expect(result).toEqual({
        message: 'This restaurant cannot be found',
      });
    });
  });

  describe('deleteRestaurant', () => {
    it('should return that restaurant after changing the active state of a restaurant', async () => {
      const result = await restaurantController.deleteRestaurant({
        restaurant_id: expectedRestaurants[0].restaurant_id,
      });
      expect(result).toEqual(expectedRestaurants[0]);
    });

    it('should return restaurant cannot be found message if the restaurant cannot be found', async () => {
      jest
        .spyOn(restaurantService, 'getRestaurantByID')
        .mockResolvedValue(null);
      const result = await restaurantController.deleteRestaurant({
        restaurant_id: expectedRestaurants[0].restaurant_id,
      });
      expect(result).toEqual({
        message: 'This restaurant cannot be found',
      });
    });
  });
});
