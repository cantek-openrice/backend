import { RestaurantOwner } from 'src/restaurantOwner/interfaces/restaurantOwner.interface';

export class RestaurantOwnerEntity implements RestaurantOwner {
  restaurant_owner_id: string;
  user_id: string;
  restaurant_id: string;
  active: boolean;
  created_at: Date;
}
