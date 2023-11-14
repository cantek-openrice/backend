import { UserRole } from '../../../global/utils/enums/UserRole';

export interface User {
  user_id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  modified_at: Date;
  active: boolean;
  role: UserRole;
}
