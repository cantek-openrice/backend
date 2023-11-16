export class UpdateReviewDto {
  user_id?: string;
  restaurant_id?: string;
  rating?: number;
  title?: string;
  visited_date?: Date;
  content?: string;
  spending?: number;
  active?: boolean;
}
