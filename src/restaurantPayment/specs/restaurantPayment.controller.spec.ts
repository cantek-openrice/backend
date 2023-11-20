import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantPaymentController } from '../restaurantPayment.controller';
import { RestaurantPaymentService } from '../restaurantPayment.service';
import { expectedRestaurantPayments } from './expectedRestaurantPayments';

jest.mock('../restaurantPayment.service');

describe('RestaurantPaymentController', () => {
  let restaurantPayment: TestingModule;
  let restaurantPaymentController: RestaurantPaymentController;
  let restaurantPaymentService: RestaurantPaymentService;

  beforeAll(async () => {
    restaurantPayment = await Test.createTestingModule({
      controllers: [RestaurantPaymentController],
      providers: [RestaurantPaymentService],
    }).compile();

    restaurantPaymentController =
      restaurantPayment.get<RestaurantPaymentController>(
        RestaurantPaymentController,
      );
    restaurantPaymentService = restaurantPayment.get<RestaurantPaymentService>(
      RestaurantPaymentService,
    );
  });

  beforeEach(() => {
    jest
      .spyOn(restaurantPaymentService, 'getRestaurantPayments')
      .mockResolvedValue(expectedRestaurantPayments);
    jest
      .spyOn(restaurantPaymentService, 'getRestaurantPaymentByID')
      .mockResolvedValue(expectedRestaurantPayments);
    jest
      .spyOn(restaurantPaymentService, 'createRestaurantPayment')
      .mockResolvedValue(expectedRestaurantPayments);
    jest
      .spyOn(restaurantPaymentService, 'deleteRestaurantPayment')
      .mockResolvedValue(expectedRestaurantPayments);
  });

  describe('getRestaurantPayments', () => {
    it('should return restaurant payments', async () => {
      const result = await restaurantPaymentController.getRestaurantPayments();
      expect(result).toEqual(expectedRestaurantPayments);
    });
  });

  describe('getRestaurantPaymentByID', () => {
    it('should return restaurant payment of that restaurant payment id', async () => {
      const result = await restaurantPaymentController.getRestaurantPaymentByID(
        {
          restaurant_payment_id:
            expectedRestaurantPayments[0].restaurant_payment_id,
        },
      );
      expect(result).toEqual(expectedRestaurantPayments[0]);
    });
  });

  describe('createRestaurantPayment', () => {
    it('should return that restaurant payment after creating a restaurant payment', async () => {
      const result = await restaurantPaymentController.createRestaurantPayment({
        restaurant_id: expectedRestaurantPayments[0].restaurant_id,
        payment_method_id: expectedRestaurantPayments[0].payment_method_id,
      });
      expect(result).toEqual(expectedRestaurantPayments[0]);
    });
  });

  describe('deleteRestaurantPayment', () => {
    it('should return that restaurant payment after changing the active state of a restaurant payment', async () => {
      const result = await restaurantPaymentController.deleteRestaurantPayment({
        restaurant_payment_id:
          expectedRestaurantPayments[0].restaurant_payment_id,
      });
      expect(result).toEqual(expectedRestaurantPayments[0]);
    });

    it('should return restaurant payment method cannot be found message if the restaurant payment method cannot be found', async () => {
      jest
        .spyOn(restaurantPaymentService, 'getRestaurantPaymentByID')
        .mockResolvedValue(null);
      const result = await restaurantPaymentController.deleteRestaurantPayment({
        restaurant_payment_id:
          expectedRestaurantPayments[0].restaurant_payment_id,
      });
      expect(result).toEqual({
        message: 'This restaurant payment method cannot be found',
      });
    });
  });
});
