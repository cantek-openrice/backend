import { Test, TestingModule } from '@nestjs/testing';
import * as jwtSimple from 'jwt-simple';
import * as dotenv from 'dotenv';
import { Request } from 'express';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { expectedUsersHashPassword } from './expectedUsersHashPassword';
import { expectedUsers } from './expectedUsers';

dotenv.config();

jest.mock('../auth.service');
jest.mock('../../user/user.service');

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
    req = {
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
    it('should return that user after registration of a new user', async () => {
      const expectedUsersHashPasswordSync = await expectedUsersHashPassword();
      jest
        .spyOn(userService, 'createUser')
        .mockResolvedValue(expectedUsersHashPasswordSync);

      const result = await authController.register({
        username: 'ttiimmothy',
        email: 'ttiimmothhylsff@gmail.com',
        password: expectedUsers[0].password,
        role: expectedUsers[0].role,
      });

      const token = jwtSimple.encode(
        expectedUsersHashPasswordSync[0],
        process.env.JWT_SECRET as string,
      );

      expect(result).toEqual({ token });
    });

    it('cannot register if the username is already used', async () => {
      const result = await authController.register({
        username: expectedUsers[0].username,
        email: 'ttiimmothhylsff@gmail.com',
        password: expectedUsers[0].password,
        role: expectedUsers[0].role,
      });

      expect(result).toEqual({ message: 'This username is already used' });
    });

    it('cannot register if the email is already used', async () => {
      const result = await authController.register({
        username: 'ttiimmothy',
        email: expectedUsers[0].email,
        password: expectedUsers[0].password,
        role: expectedUsers[0].role,
      });

      expect(result).toEqual({ message: 'This email is already used' });
    });
  });

  describe('login', () => {
    it('should return that user after login', async () => {
      const expectedUsersHashPasswordSync = await expectedUsersHashPassword();
      jest
        .spyOn(authService, 'login')
        .mockResolvedValue(expectedUsersHashPasswordSync);

      const result = await authController.login({
        username: expectedUsers[0].username,
        password: expectedUsers[0].password,
      });

      const token = jwtSimple.encode(
        expectedUsersHashPasswordSync[0],
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
        password: expectedUsers[0].password,
      });

      expect(result).toEqual({ message: 'The username is not found' });
    });

    it('cannot login when the password is incorrect', async () => {
      const result = await authController.login({
        username: expectedUsers[0].username,
        password: 'ttiimmothy',
      });

      expect(result).toEqual({ message: 'The password is incorrect' });
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user', async () => {
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
