import { Role } from '../../../global/utils/enums/Role';

export class UpdateUserDto {
  username?: string;
  password?: string;
  role?: Role;
}
