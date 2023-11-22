import { RestaurantPaymentMethod } from '../../interfaces/restaurantPaymentMethod.interface';

export class RestaurantPaymentMethodEntity implements RestaurantPaymentMethod {
  restaurant_payment_method_id: string;
  restaurant_id: string;
  payment_method_id: string;
  active: boolean;
  created_at: Date;
}
