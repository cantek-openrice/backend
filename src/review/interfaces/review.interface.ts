export interface Review {
  review_id: string;
  user_id: string;
  restaurant_id: string;
  rating: number;
  title: string;
  visited_date: Date;
  content: string;
  spending: number;
  active: boolean;
  created_at: Date;
  modified_at: Date;
  username?: string;
  restaurantName?: string;
}
