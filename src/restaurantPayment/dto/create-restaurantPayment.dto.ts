import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantPaymentDto {
  @ApiProperty({
    description: 'The foreign key (UUID, restaurant_id) from restaurant table',
    type: String,
  })
  restaurant_id: string;

  @ApiProperty({
    description:
      'The foreign key (UUID, payment_method_id) from payment method table',
    type: String,
  })
  payment_method_id: string;
}
