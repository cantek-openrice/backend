import { UserRole } from '../../../../global/utils/enums/UserRole';
import { User } from '../../interfaces/user.interface';

export class UserEntity implements User {
  user_id: string;
  email: string;
  username: string;
  password: string;
  created_at: Date;
  modified_at: Date;
  active: boolean;
  role: UserRole;
}
