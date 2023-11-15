import { RestaurantPayment } from 'src/restaurantPayment/interfaces/restaurantPayment.interface';

export class RestaurantPaymentEntity implements RestaurantPayment {
  restaurant_payment_id: string;
  restaurant_id: string;
  payment_method_id: string;
  active: boolean;
  created_at: Date;
}
