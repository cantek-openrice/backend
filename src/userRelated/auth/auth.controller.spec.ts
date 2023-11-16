import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRole } from '../../global/utils/enums/UserRole';
import { hashPassword } from '../../global/lib/hash';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import * as jwtSimple from 'jwt-simple';
import * as dotenv from 'dotenv';

jest.mock('./auth.service');
jest.mock('../user/user.service');

dotenv.config();

describe('AuthController', () => {
  let auth: TestingModule;
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let req: Request;

  beforeAll(async () => {
    auth = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    authController = auth.get<AuthController>(AuthController);
    authService = auth.get<AuthService>(AuthService);
    userService = auth.get<UserService>(UserService);
  });

  beforeEach(() => {
    const expectedUsers = [
      {
        user_id: '123',
        username: 'Timothy',
        email: 'dinosauli2006@mgmail.com',
        password: 'Timothy',
        role: 'Admin',
        active: true,
        created_at: new Date('2023-11-14'),
        modified_at: new Date('2023-11-14'),
      },
    ];

    req = {
      body: {},
      query: {},
      params: {},
      session: {},
      user: {
        user_id: expectedUsers[0].user_id,
        username: expectedUsers[0].username,
        email: expectedUsers[0].email,
        role: expectedUsers[0].role,
      },
    } as any as Request;

    jest
      .spyOn(userService, 'getUsers')
      .mockImplementation(() => Promise.resolve(expectedUsers));
  });

  describe('register', () => {
    it('should return the user after registration of a new user', async () => {
      const expectedUsers = [
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

      jest.spyOn(userService, 'createUser').mockResolvedValue(expectedUsers);

      const result = await authController.register({
        username: 'ttiimmothy',
        email: 'ttiimmothhylsff@gmail.com',
        password: expectedUsers[0].password,
        role: UserRole.Admin,
      });

      const token = jwtSimple.encode(
        expectedUsers[0],
        process.env.JWT_SECRET as string,
      );

      expect(result).toEqual({ token });
    });

    it('cannot register if the username is already used', async () => {
      const expectedUsers = [
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

      const result = await authController.register({
        username: expectedUsers[0].username,
        email: 'ttiimmothhylsff@gmail.com',
        password: expectedUsers[0].password,
        role: UserRole.Admin,
      });

      expect(result).toEqual({ message: 'This username is already used' });
    });

    it('cannot register if the email is already used', async () => {
      const expectedUsers = [
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

      const result = await authController.register({
        username: 'ttiimmothy',
        email: expectedUsers[0].email,
        password: expectedUsers[0].password,
        role: UserRole.Admin,
      });

      expect(result).toEqual({ message: 'This email is already used' });
    });
  });

  describe('login', () => {
    it('should return that user after login', async () => {
      const expectedUsers = [
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

      jest.spyOn(authService, 'login').mockResolvedValue(expectedUsers);

      const result = await authController.login({
        username: expectedUsers[0].username,
        password: 'Timothy',
      });

      const token = jwtSimple.encode(
        expectedUsers[0],
        process.env.JWT_SECRET as string,
      );

      expect(result).toEqual({
        user: {
          user_id: expectedUsers[0].user_id,
          username: expectedUsers[0].username,
          email: expectedUsers[0].email,
          role: expectedUsers[0].role,
        },
        token,
      });
    });

    it('cannot login when the username is not found', async () => {
      const result = await authController.login({
        username: 'ttiimmothy',
        password: 'Timothy',
      });

      expect(result).toEqual({ message: 'The username is not found' });
    });

    it('cannot login when the password is incorrect', async () => {
      const expectedUsers = [
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

      const result = await authController.login({
        username: expectedUsers[0].username,
        password: 'ttiimmothy',
      });

      expect(result).toEqual({ message: 'The password is incorrect' });
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user', async () => {
      const expectedUsers = [
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

      const result = await authController.getCurrentUser(req);

      expect(result).toEqual({
        user: {
          user_id: expectedUsers[0].user_id,
          username: expectedUsers[0].username,
          email: expectedUsers[0].email,
          role: expectedUsers[0].role,
        },
      });
    });
  });
});
