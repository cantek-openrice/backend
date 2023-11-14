import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/global/utils/enums/Role';

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

  @ApiProperty({
    description: 'The role of the user',
    enum: UserRole,
    default: UserRole.User,
  })
  role?: UserRole;
}
