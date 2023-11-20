import { Test, TestingModule } from '@nestjs/testing';
import { DishController } from '../dish.controller';
import { DishService } from '../dish.service';
import { expectedDishes } from './expectedDishes';

jest.mock('../dish.service');

describe('DishController', () => {
  let dish: TestingModule;
  let dishController: DishController;
  let dishService: DishService;

  beforeAll(async () => {
    dish = await Test.createTestingModule({
      controllers: [DishController],
      providers: [DishService],
    }).compile();

    dishController = dish.get<DishController>(DishController);
    dishService = dish.get<DishService>(DishService);
  });

  beforeEach(() => {
    jest.spyOn(dishService, 'getDishes').mockResolvedValue(expectedDishes);
    jest.spyOn(dishService, 'getDishByID').mockResolvedValue(expectedDishes);
  });

  describe('getDishes', () => {
    it('should return dishes', async () => {
      const result = await dishController.getDishes();
      expect(result).toEqual(expectedDishes);
    });
  });

  describe('getDishByID', () => {
    it('should return dish of that dish id', async () => {
      const result = await dishController.getDishByID({
        dish_id: '123',
      });
      expect(result).toEqual(expectedDishes[0]);
    });
  });
});
