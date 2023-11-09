export interface CreateReviewDto {
  user_id: string;
  restaurant_id: string;
  rating: number;
  title: string;
  visited_date: Date;
  content: string;
  spending: number;
}
