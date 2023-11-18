import { hashPassword } from '../../../global/lib/hash';

export const expectedUsersHashPassword = async () => [
  {
    user_id: '123',
    username: 'Timothy',
    email: 'dinosauli2006@mgmail.com',
    password: await hashPassword('Timothy'),
    role: 'Admin',
    active: true,
    created_at: new Date('2023-11-14'),
    modified_at: new Date('2023-11-14'),
  },
];
