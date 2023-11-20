import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { PaymentMethodService } from '../paymentMethod.service';
import { expectedPaymentMethods } from './expectedPaymentMethods';

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('PaymentMethodService', () => {
  let paymentMethodService: PaymentMethodService;
  let paymentMethodIDs: { payment_method_id: string }[];

  beforeAll(async () => {
    paymentMethodService = new PaymentMethodService(knex);
  });

  beforeEach(async () => {
    paymentMethodIDs = await knex
      .insert({
        name: expectedPaymentMethods[0].name,
      })
      .into('payment_method')
      .returning('payment_method_id');
  });

  describe('getPaymentMethods', () => {
    it('should return payment methods', async () => {
      const result = await paymentMethodService.getPaymentMethods();
      const paymentMethodFiltered = result.filter(
        (paymentMethod) =>
          paymentMethod.payment_method_id ===
          paymentMethodIDs[0].payment_method_id,
      );
      expect(paymentMethodFiltered).toMatchObject([
        {
          name: expectedPaymentMethods[0].name,
        },
      ]);
    });
  });

  describe('getPaymentMethodByID', () => {
    it('should return payment method of that payment method id', async () => {
      const result = await paymentMethodService.getPaymentMethodByID(
        paymentMethodIDs[0].payment_method_id,
      );
      expect(result).toMatchObject([
        {
          name: expectedPaymentMethods[0].name,
        },
      ]);
    });
  });

  afterEach(async () => {
    await knex('payment_method')
      .whereIn(
        'payment_method_id',
        paymentMethodIDs.map(
          (paymentMethodID) => paymentMethodID.payment_method_id,
        ),
      )
      .del();
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
