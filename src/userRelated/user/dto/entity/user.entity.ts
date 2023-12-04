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

export class UpdateUserProfileResponse {
  userInfo?: {
    user_id: string;
    email: string;
    username: string;
    role: string;
    profile_picture_url: string;
  };
  message?: string;
  token?: string;
}
