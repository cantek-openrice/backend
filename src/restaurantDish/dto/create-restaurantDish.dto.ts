import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDishDto {
  @ApiProperty({
    description: 'The foregin key (UUID) from restaurant table',
    type: String,
  })
  restaurant_id: string;

  @ApiProperty({
    description: 'The foregin key (UUID) from dish table',
    type: String,
  })
  dish_id: string;
}
