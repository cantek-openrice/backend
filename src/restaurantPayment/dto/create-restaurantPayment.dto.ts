import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantPaymentDto {
  @ApiProperty({
    description: 'The foregin key (UUID) from restaurant table',
    type: String,
  })
  restaurant_id: string;

  @ApiProperty({
    description: 'The foregin key (UUID) from payment mathod table',
    type: String,
  })
  payment_method_id: string;
}
