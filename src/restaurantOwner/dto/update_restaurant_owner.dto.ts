import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRestaurantOwnerDto {
  @ApiPropertyOptional({ type: String })
  user_id?: string;

  @ApiPropertyOptional({ type: String })
  restaurant_id?: string;

  @ApiPropertyOptional({ type: Boolean })
  active?: boolean;
}
