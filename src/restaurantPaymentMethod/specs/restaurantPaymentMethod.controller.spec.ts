import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantPaymentMethodController } from '../restaurantPaymentMethod.controller';
import { RestaurantPaymentMethodService } from '../restaurantPaymentMethod.service';
import { expectedRestaurantPaymentMethods } from './expectedRestaurantPaymentMethods';

jest.mock('../restaurantPaymentMethod.service');

describe('RestaurantPaymentMethodController', () => {
  let restaurantPaymentMethod: TestingModule;
  let restaurantPaymentMethodController: RestaurantPaymentMethodController;
  let restaurantPaymentMethodService: RestaurantPaymentMethodService;

  beforeAll(async () => {
    restaurantPaymentMethod = await Test.createTestingModule({
      controllers: [RestaurantPaymentMethodController],
      providers: [RestaurantPaymentMethodService],
    }).compile();

    restaurantPaymentMethodController =
      restaurantPaymentMethod.get<RestaurantPaymentMethodController>(
        RestaurantPaymentMethodController,
      );
    restaurantPaymentMethodService =
      restaurantPaymentMethod.get<RestaurantPaymentMethodService>(
        RestaurantPaymentMethodService,
      );
  });

  beforeEach(() => {
    jest
      .spyOn(restaurantPaymentMethodService, 'getRestaurantPaymentMethods')
      .mockResolvedValue(expectedRestaurantPaymentMethods);
    jest
      .spyOn(restaurantPaymentMethodService, 'getRestaurantPaymentMethodByID')
      .mockResolvedValue(expectedRestaurantPaymentMethods);
    jest
      .spyOn(restaurantPaymentMethodService, 'createRestaurantPaymentMethod')
      .mockResolvedValue(expectedRestaurantPaymentMethods);
    jest
      .spyOn(restaurantPaymentMethodService, 'deleteRestaurantPaymentMethod')
      .mockResolvedValue(expectedRestaurantPaymentMethods);
  });

  describe('getRestaurantPaymentMethods', () => {
    it('should return restaurant payments', async () => {
      const result =
        await restaurantPaymentMethodController.getRestaurantPaymentMethods();
      expect(result).toEqual(expectedRestaurantPaymentMethods);
    });
  });

  describe('getRestaurantPaymentMethodByID', () => {
    it('should return restaurant payment of that restaurant payment id', async () => {
      const result =
        await restaurantPaymentMethodController.getRestaurantPaymentMethodByID({
          restaurant_payment_method_id:
            expectedRestaurantPaymentMethods[0].restaurant_payment_method_id,
        });
      expect(result).toEqual(expectedRestaurantPaymentMethods[0]);
    });
  });

  describe('createRestaurantPaymentMethod', () => {
    it('should return that restaurant payment after creating a restaurant payment', async () => {
      const result =
        await restaurantPaymentMethodController.createRestaurantPaymentMethod({
          restaurant_id: expectedRestaurantPaymentMethods[0].restaurant_id,
          payment_method_id:
            expectedRestaurantPaymentMethods[0].payment_method_id,
        });
      expect(result).toEqual(expectedRestaurantPaymentMethods[0]);
    });
  });

  describe('deleteRestaurantPaymentMethod', () => {
    it('should return that restaurant payment after changing the active state of a restaurant payment', async () => {
      const result =
        await restaurantPaymentMethodController.deleteRestaurantPaymentMethod({
          restaurant_payment_method_id:
            expectedRestaurantPaymentMethods[0].restaurant_payment_method_id,
        });
      expect(result).toEqual(expectedRestaurantPaymentMethods[0]);
    });

    it('should return restaurant payment method cannot be found message if the restaurant payment method cannot be found', async () => {
      jest
        .spyOn(restaurantPaymentMethodService, 'getRestaurantPaymentMethodByID')
        .mockResolvedValue(null);
      const result =
        await restaurantPaymentMethodController.deleteRestaurantPaymentMethod({
          restaurant_payment_method_id:
            expectedRestaurantPaymentMethods[0].restaurant_payment_method_id,
        });
      expect(result).toEqual({
        message: 'This restaurant payment method cannot be found',
      });
    });
  });
});
