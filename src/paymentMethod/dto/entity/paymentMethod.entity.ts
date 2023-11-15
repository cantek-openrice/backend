import { PaymentMethod } from 'src/paymentMethod/interfaces/paymentMethod.interface';

export class PaymentMethodEntity implements PaymentMethod {
  payment_method_id: string;
  name: string;
  active: boolean;
  created_at: Date;
}
