import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantOwnerDto {
  @ApiProperty({
    description: 'THe foregin key (UUID) from user table',
    type: String,
  })
  user_id: string;

  @ApiProperty({
    description: 'The foregin (UUID) from restaurant table',
    type: String,
  })
  restaurant_id: string;
}
