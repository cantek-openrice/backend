import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../global/utils/enums/Role';

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
    description: 'role',
    type: String,
    default: 'User',
  })
  role?: Role;
}
