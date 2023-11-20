import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantDishController } from '../restaurantDish.controller';
import { RestaurantDishService } from '../restaurantDish.service';
import { expectedRestaurantDishes } from './expectedRestaurantDishes';

jest.mock('../restaurantDish.service');

describe('RestaurantDishController', () => {
  let restaurantDish: TestingModule;
  let restaurantDishController: RestaurantDishController;
  let restaurantDishService: RestaurantDishService;

  beforeAll(async () => {
    restaurantDish = await Test.createTestingModule({
      controllers: [RestaurantDishController],
      providers: [RestaurantDishService],
    }).compile();

    restaurantDishController = restaurantDish.get<RestaurantDishController>(
      RestaurantDishController,
    );
    restaurantDishService = restaurantDish.get<RestaurantDishService>(
      RestaurantDishService,
    );
  });

  beforeEach(() => {
    jest
      .spyOn(restaurantDishService, 'getRestaurantDishes')
      .mockResolvedValue(expectedRestaurantDishes);
    jest
      .spyOn(restaurantDishService, 'getRestaurantDishByID')
      .mockResolvedValue(expectedRestaurantDishes);
    jest
      .spyOn(restaurantDishService, 'createRestaurantDish')
      .mockResolvedValue(expectedRestaurantDishes);
    jest
      .spyOn(restaurantDishService, 'deleteRestaurantDish')
      .mockResolvedValue(expectedRestaurantDishes);
  });

  describe('getRestaurantDishes', () => {
    it('should return restaurant Dishs', async () => {
      const result = await restaurantDishController.getRestaurantDishes();
      expect(result).toEqual(expectedRestaurantDishes);
    });
  });

  describe('getRestaurantDishByID', () => {
    it('should return restaurant dish of that restaurant dish id', async () => {
      const result = await restaurantDishController.getRestaurantDishByID({
        restaurant_dish_id: expectedRestaurantDishes[0].restaurant_dish_id,
      });
      expect(result).toEqual(expectedRestaurantDishes[0]);
    });
  });

  describe('createRestaurantDish', () => {
    it('should return that restaurant dish after creating a restaurant dish', async () => {
      const result = await restaurantDishController.createRestaurantDish({
        restaurant_id: expectedRestaurantDishes[0].restaurant_id,
        dish_id: expectedRestaurantDishes[0].dish_id,
      });
      expect(result).toEqual(expectedRestaurantDishes[0]);
    });
  });

  describe('deleteRestaurantDish', () => {
    it('should return that restaurant dish after changing the active state of a restaurant dish', async () => {
      const result = await restaurantDishController.deleteRestaurantDish({
        restaurant_dish_id: expectedRestaurantDishes[0].restaurant_dish_id,
      });
      expect(result).toEqual(expectedRestaurantDishes[0]);
    });
  });

  it('should return restaurant dish cannot be found message if the restaurant dish cannot be found', async () => {
    jest
      .spyOn(restaurantDishService, 'getRestaurantDishByID')
      .mockResolvedValue(null);
    const result = await restaurantDishController.deleteRestaurantDish({
      restaurant_dish_id: expectedRestaurantDishes[0].restaurant_dish_id,
    });
    expect(result).toEqual({
      message: 'This restaurant dish cannot be found',
    });
  });
});
