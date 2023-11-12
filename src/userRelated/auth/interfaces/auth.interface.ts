import { Role } from 'src/global/utils/enums/Role';

export interface Auth {
  user_id: string;
  username: string;
  password: string;
  active: boolean;
  created_at: Date;
  modified_at: Date;
  role: Role;
}
