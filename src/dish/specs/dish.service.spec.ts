import * as dotenv from 'dotenv';
import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { DishService } from '../dish.service';
import { expectedDishes } from './expectedDishes';

dotenv.config();

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('DishService', () => {
  let dishService: DishService;
  let dishIDs: { dish_id: string }[];

  beforeAll(async () => {
    dishService = new DishService(knex);
  });

  beforeEach(async () => {
    dishIDs = await knex
      .insert({
        name: expectedDishes[0].name,
      })
      .into('dish')
      .returning('dish_id');
  });

  describe('getDishes', () => {
    it('should return dishes', async () => {
      const result = await dishService.getDishes();
      const dishFiltered = result.filter(
        (dish) => dish.dish_id === dishIDs[0].dish_id,
      );
      expect(dishFiltered).toMatchObject([
        {
          name: expectedDishes[0].name,
        },
      ]);
    });
  });

  describe('getDishByID', () => {
    it('should return dish of that dish id', async () => {
      const result = await dishService.getDishByID(dishIDs[0].dish_id);
      expect(result).toMatchObject([
        {
          name: expectedDishes[0].name,
        },
      ]);
    });
  });

  afterEach(async () => {
    await knex('dish')
      .whereIn(
        'dish_id',
        dishIDs.map((dishID) => dishID.dish_id),
      )
      .del();
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
