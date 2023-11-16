import { UserRole } from '../../../global/utils/enums/UserRole';

export class CreateUserDto {
  email: string;
  username: string;
  password: string;
  role?: UserRole;
}
