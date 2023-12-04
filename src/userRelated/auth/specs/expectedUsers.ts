import { UserRole } from '../../../global/utils/enums/UserRole';

export const expectedUsers = [
  {
    user_id: '123',
    username: 'Timothy',
    email: 'dinosauli2006@mgmail.com',
    password: 'Timothy',
    role: UserRole.Admin,
    active: true,
    profile_picture_url: 'image.png',
    created_at: new Date('2023-11-14'),
    modified_at: new Date('2023-11-14'),
  },
];
