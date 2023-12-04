import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../../global/utils/enums/UserRole';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'The username of that user',
    type: String,
  })
  username?: string;

  @ApiPropertyOptional({
    description: 'The email of that user',
    type: String,
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'The password of that user',
    type: String,
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'The user role of that user',
    enum: UserRole,
    default: UserRole.User,
  })
  role?: UserRole;
}

export class UpdateUserDtoExtended {
  @ApiProperty({ type: UpdateUserDto })
  updateUserDto: UpdateUserDto;

  @ApiProperty({ type: String })
  fileExtension: string;
}
