import { Role } from 'src/global/utils/enums/Role';

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  role: Role;
}
