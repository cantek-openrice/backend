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
    description: 'The restaurant id (UUID)',
    type: String,
  })
  restaurantID?: string;

  @ApiPropertyOptional({
    description: 'The name of the restaurant photo',
    type: String,
  })
  imageName?: string;
}
