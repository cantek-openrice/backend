import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscribeDto {
  @ApiProperty({
    description: 'The foregin key (UUID) from user table',
    type: String,
  })
  user_id: string;

  @ApiProperty({
    description: 'The foregin key (UUID) from restaurant table',
    type: String,
  })
  restaurant_id: string;
}
