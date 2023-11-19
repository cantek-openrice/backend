import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodController } from '../paymentMethod.controller';
import { PaymentMethodService } from '../paymentMethod.service';
import { expectedPaymentMethods } from './expectedPaymentMethods';

jest.mock('../paymentMethod.service');

describe('paymentMethodController', () => {
  let paymentMethod: TestingModule;
  let paymentMethodController: PaymentMethodController;
  let paymentMethodService: PaymentMethodService;

  beforeAll(async () => {
    paymentMethod = await Test.createTestingModule({
      controllers: [PaymentMethodController],
      providers: [PaymentMethodService],
    }).compile();

    paymentMethodController = paymentMethod.get<PaymentMethodController>(
      PaymentMethodController,
    );
    paymentMethodService =
      paymentMethod.get<PaymentMethodService>(PaymentMethodService);
  });

  beforeEach(() => {
    jest
      .spyOn(paymentMethodService, 'getPaymentMethods')
      .mockResolvedValue(expectedPaymentMethods);
    jest
      .spyOn(paymentMethodService, 'getPaymentMethodByID')
      .mockResolvedValue(expectedPaymentMethods);
  });

  describe('getPaymentMethods', () => {
    it('should return payment methods', async () => {
      const result = await paymentMethodController.getPaymentMethods();
      expect(result).toEqual(expectedPaymentMethods);
    });
  });

  describe('getPaymentMethodByID', () => {
    it('should return payment method of that payment method id', async () => {
      const result = await paymentMethodController.getPaymentMethodByID({
        payment_method_id: '123',
      });
      expect(result).toEqual(expectedPaymentMethods[0]);
    });
  });
});
