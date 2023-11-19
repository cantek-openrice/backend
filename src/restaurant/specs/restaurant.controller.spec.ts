import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from '../restaurant.controller';
import { RestaurantService } from '../restaurant.service';
import { expectedRestaurants } from './expectedRestaurants';

jest.mock('../restaurant.service');

describe('restaurantController', () => {
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
    it('should return restaurants', async () => {
      const result = await restaurantController.getRestaurants(
        10,
        0,
        'restaurant',
      );
      expect(result).toEqual([
        { ...expectedRestaurants[0], averageRating: 1, reviewCount: 1 },
      ]);
    });
  });

  describe('getRestaurantByID', () => {
    it('should return restaurant of that restaurant id', async () => {
      const result = await restaurantController.getRestaurantByID({
        restaurant_id: '123',
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
        name: 'restaurant',
        address: 'address',
        district_id: '123',
        latitude: 1,
        longitude: 1,
        postal_code: 'M2M 0A5',
        phone: '6471231234',
        intro: 'intro',
        opening_hours: 'hour',
        cover_image: 'image.png',
      });

      expect(result).toEqual(expectedRestaurants[0]);
    });
  });

  describe('updateRestaurant', () => {
    it('should return that restaurant  after updating a restaurant ', async () => {
      const result = await restaurantController.updateRestaurant(
        {
          restaurant_id: '123',
        },
        {
          name: 'restaurant',
          address: 'address',
          district_id: '123',
          latitude: 1,
          longitude: 1,
          postal_code: 'M2M 0A5',
          phone: '6471231234',
          intro: 'intro',
          opening_hours: 'hour',
          cover_image: 'image.png',
          active: false,
        },
      );

      expect(result).toEqual(expectedRestaurants[0]);
    });
  });

  describe('deleteRestaurant', () => {
    it('should return that restaurant  after changing the active state of a restaurant ', async () => {
      const result = await restaurantController.deleteRestaurant({
        restaurant_id: '123',
      });
      expect(result).toEqual(expectedRestaurants[0]);
    });
  });
});
