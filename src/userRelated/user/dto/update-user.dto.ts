import { UserRole } from '../../../global/utils/enums/UserRole';

export class UpdateUserDto {
  username?: string;
  password?: string;
  role?: UserRole;
}
