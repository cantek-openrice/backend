<<<<<<< HEAD
import { Role } from 'src/global/utils/enums/Role';

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  role: Role;
=======
import { UserRole } from '../../../global/utils/enums/UserRole';

export class CreateUserDto {
  email: string;
  username: string;
  password: string;
  role?: UserRole;
>>>>>>> 1152dfa5f440c26c0775963630b280b7babcd446
}
