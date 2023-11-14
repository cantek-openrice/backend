import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscribeDto {
  @ApiProperty({
    description: 'The foreign key (UUID, user_id) from user table',
    type: String,
  })
  user_id: string;

  @ApiProperty({
    description: 'The foreign key (UUID, restaurant_id) from restaurant table',
    type: String,
  })
  restaurant_id: string;
}
