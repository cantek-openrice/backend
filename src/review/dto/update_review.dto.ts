export class UpdateReviewDto {
  user_id?: string;
  restaurant_id?: string;
  title?: string;
  content?: string;
  rating?: number;
  spending?: number;
  visited_date?: Date;
  active?: boolean;
}
