import { Role } from 'src/global/utils/enums/Role';

export interface User {
  user_id: string;
  username: string;
  password: string;
  created_at: Date;
  modified_at: Date;
  active: boolean;
  role: Role;
}
