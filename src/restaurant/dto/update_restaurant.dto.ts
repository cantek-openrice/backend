import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRestaurantDto {
  @ApiPropertyOptional({ description: 'name of the restaurant', type: String })
  name?: string;

  @ApiPropertyOptional({
    description: 'address of the restaurant',
    type: String,
  })
  address?: string;

  @ApiPropertyOptional({
    description: 'The foreign key (UUID, district_id) of the restaurant',
    type: String,
  })
  district_id?: string;

  @ApiPropertyOptional({
    description: 'latitude of the restaurant',
    type: Number,
  })
  latitude?: number;

  @ApiPropertyOptional({
    description: 'longitude of the restaurant',
    type: Number,
  })
  longitude?: number;

  @ApiPropertyOptional({
    description: 'postal code of the restaurant',
    type: String,
  })
  postal_code?: string;

  @ApiPropertyOptional({
    description: 'phone number of the restaurant',
    type: String,
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'introduction of the restaurant',
    type: String,
  })
  intro?: string;

  @ApiPropertyOptional({
    description: 'opening hour of the restaurant',
    type: String,
  })
  opening_hours?: string;

  @ApiPropertyOptional({
    description: 'cover image url of the restaurant',
    type: String,
  })
  cover_image_url?: string;

  @ApiPropertyOptional({
    description: 'active status of the restaurant',
    type: Boolean,
  })
  active?: boolean;
}
