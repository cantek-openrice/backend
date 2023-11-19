export interface Review {
  review_id: string;
  user_id: string;
  restaurant_id: string;
  username?: string;
  restaurantName?: string;
  title: string;
  content: string;
  rating: number;
  spending: number;
  visited_date: Date;
  active: boolean;
  created_at: Date;
  modified_at: Date;
}
