import { Role } from 'src/global/utils/enums/Role';

export interface UpdateUserDto {
  username?: string;
  password?: string;
  role?: Role;
}
