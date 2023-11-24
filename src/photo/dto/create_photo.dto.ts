import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiPropertyOptional({
    description: 'The foreign key (UUID) from photo category table',
    type: String,
  })
  photo_category_id?: string;

  @ApiPropertyOptional({
    description: 'The foreign key (UUID) from review table',
    type: String,
  })
  review_id?: string;

  @ApiPropertyOptional({
    description: 'The url of photo',
    type: String,
  })
  photo_url?: string;

  @ApiPropertyOptional({
    type: String,
  })
  restaurantID?: string;

  @ApiPropertyOptional({
    type: String,
  })
  imageName?: string;
}
