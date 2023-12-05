import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiPropertyOptional({ type: String })
  user_id?: string;

  @ApiPropertyOptional({ type: String })
  restaurant_id?: string;

  @ApiPropertyOptional({ type: String })
  title?: string;

  @ApiPropertyOptional({ type: String })
  content?: string;

  @ApiPropertyOptional({ type: Number })
  rating?: number;

  @ApiPropertyOptional({ type: Number })
  spending?: number;

  @ApiPropertyOptional({ type: Date })
  visited_date?: Date;

  @ApiPropertyOptional({ type: Boolean })
  active?: boolean;
}
