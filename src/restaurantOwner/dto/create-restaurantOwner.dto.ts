import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantOwnerDto {
  @ApiProperty({
    description: 'THe foreign key (UUID, user_id) from user table',
    type: String,
  })
  user_id: string;

  @ApiProperty({
    description: 'The foreign (UUID, restaurant_id) from restaurant table',
    type: String,
  })
  restaurant_id: string;
}
