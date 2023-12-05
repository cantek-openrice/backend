import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'The name of the restaurant',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The address of the restaurant',
    type: String,
  })
  address: string;

  @ApiProperty({
    description: 'The foreign key (UUID, district_id) from district table',
    type: String,
  })
  district_id: string;

  @ApiProperty({
    description: 'The latitude of the restaurant',
    type: Number,
  })
  latitude: number;

  @ApiProperty({
    description: 'The longitude of the restaurant',
    type: Number,
  })
  longitude: number;

  @ApiProperty({
    description: 'The postal code of the restaurant',
    type: String,
  })
  postal_code: string;

  @ApiProperty({
    description: 'The phone (string) of the restaurant',
    type: String,
  })
  phone: string;

  @ApiProperty({
    description: 'The introduction of the restaurant',
    type: String,
  })
  intro: string;

  @ApiProperty({
    description: 'The opening hours of the restaurant in JSON format',
    type: String,
  })
  opening_hours: string;

  @ApiPropertyOptional({
    description: 'The url of cover image',
    type: String,
    required: false,
  })
  cover_image_url?: string;
}

export class CreateRestaurantDtoExtended {
  @ApiProperty({
    description: 'create restaurant dto',
    type: CreateRestaurantDto,
  })
  createRestaurantDto: CreateRestaurantDto;

  @ApiPropertyOptional({
    description: 'file extension of the restaurant cover image',
    type: String,
  })
  fileExtension?: string;
}
