import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The foreign key (UUID, user_id) from user table',
    type: String,
  })
  user_id: string;

  @ApiProperty({
    description: 'The foreign key (UUID, restaurant_id) from restaurant table',
    type: String,
  })
  restaurant_id: string;

  @ApiProperty({
    description: 'The title of the review',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'The content of the review',
    type: String,
  })
  content: string;

  @ApiProperty({
    description: 'The rating of the restaurant in number',
    type: Number,
    minimum: 0,
    maximum: 5,
  })
  rating: number;

  @ApiProperty({
    description: 'The spending in the restaurant',
    type: Number,
  })
  spending: number;

  @ApiProperty({
    description: 'The visiting date to the restaurant',
    type: Date,
  })
  visited_date: Date;
}
