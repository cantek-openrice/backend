import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/global/utils/enums/Role';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'The username',
    type: String,
  })
  username: string;

  @ApiProperty({
    description: 'The password',
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    type: Role,
  })
  role?: Role;
}
