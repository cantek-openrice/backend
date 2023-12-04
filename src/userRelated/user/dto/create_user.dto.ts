import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../../global/utils/enums/UserRole';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of that user',
    type: String,
  })
  username: string;

  @ApiProperty({
    description: 'The email of that user',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'The password of that user',
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

export class CreateUserDtoExtended {
  @ApiProperty({
    type: CreateUserDto,
  })
  createUserDto: CreateUserDto;

  @ApiPropertyOptional({ type: String })
  fileExtension?: string;
}
