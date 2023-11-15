export interface RestaurantPayment {
  restaurant_payment_id: string;
  restaurant_id: string;
  payment_method_id: string;
  active: boolean;
  created_at: Date;
}
