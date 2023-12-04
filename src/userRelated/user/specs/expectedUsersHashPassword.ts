import { hashPassword } from '../../../global/lib/hash';
import { UserRole } from '../../../global/utils/enums/UserRole';

export const expectedUsersHashPassword = async () => [
  {
    user_id: '123',
    username: 'Timothy',
    email: 'dinosauli2006@mgmail.com',
    password: await hashPassword('Timothy'),
    role: UserRole.Admin,
    profile_picture_url: 'image.png',
    active: true,
    created_at: new Date('2023-11-14'),
    modified_at: new Date('2023-11-14'),
  },
];
