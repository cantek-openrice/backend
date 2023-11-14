import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({
    description: 'The foreign key (UUID) from review table',
    type: String,
  })
  review_id: string;

  @ApiProperty({
    description: 'The foreign key (UUID) from photo category table',
    type: String,
  })
  photo_category_id: string;

  @ApiProperty({
    description: 'The storage address of photo',
    type: String,
  })
  address: string;
}
