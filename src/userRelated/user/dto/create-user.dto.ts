import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../../global/utils/enums/UserRole';

export class CreateUserDto {
  @ApiProperty({
    description: 'email',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'username',
    type: String,
  })
  username: string;

  @ApiProperty({
    description: 'password',
    type: String,
  })
  password: string;

  @ApiPropertyOptional({
    description: 'The role of the user',
    enum: UserRole,
    default: UserRole.User,
  })
  role?: UserRole;
}
