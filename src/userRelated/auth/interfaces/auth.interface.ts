import { UserRole } from '../../../global/utils/enums/UserRole';

export interface Auth {
  user_id: string;
  username: string;
  password: string;
  role: UserRole;
  active: boolean;
  created_at: Date;
  modified_at: Date;
}
