import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDishDto {
  @ApiProperty({
    description: 'The foreign key (UUID, restaurant_id) from restaurant table',
    type: String,
  })
  restaurant_id: string;

  @ApiProperty({
    description: 'The foreign key (UUID, dish_id) from dish table',
    type: String,
  })
  dish_id: string;
}
