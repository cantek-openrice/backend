import { Test, TestingModule } from '@nestjs/testing';
import * as jwtSimple from 'jwt-simple';
import * as dotenv from 'dotenv';
import { Request } from 'express';
import { AuthService } from '../../../userRelated/auth/auth.service';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { expectedUsers } from './expectedUsers';
import { expectedUsersHashPassword } from './expectedUsersHashPassword';

dotenv.config();
jest.mock('../user.service');
jest.mock('../../auth/auth.service');

describe('UserController', () => {
  let user: TestingModule;
  let userController: UserController;
  let userService: UserService;
  let req: Request;

  beforeAll(async () => {
    user = await Test.createTestingModule({
      controllers: [UserController],
      providers: [AuthService, UserService],
    }).compile();

    userController = user.get<UserController>(UserController);
    userService = user.get<UserService>(UserService);
  });

  beforeEach(() => {
    req = {
      user: {
        user_id: expectedUsers[0].user_id,
        username: expectedUsers[0].username,
        email: expectedUsers[0].email,
        role: expectedUsers[0].role,
        profile_picture_url: expectedUsers[0].profile_picture_url,
      },
    } as any as Request;
    jest.spyOn(userService, 'getUsers').mockResolvedValue(expectedUsers);
    jest.spyOn(userService, 'getUserByID').mockResolvedValue(expectedUsers);
    jest
      .spyOn(userService, 'updateUserProfile')
      .mockResolvedValue(expectedUsers);
    jest.spyOn(userService, 'deleteUser').mockResolvedValue(expectedUsers);
  });

  describe('getUsers', () => {
    it('should return users', async () => {
      const result = await userController.getUsers();
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('getUserByID', () => {
    it('should return user of that user id', async () => {
      const result = await userController.getUserByID({
        user_id: expectedUsers[0].user_id,
      });
      expect(result).toEqual(expectedUsers[0]);
    });
  });

  describe('updateUserProfile', () => {
    it('should return that user after updating a user profile', async () => {
      const expectedUsersHashPasswordSync = await expectedUsersHashPassword();
      jest
        .spyOn(userService, 'updateUserProfile')
        .mockResolvedValue(expectedUsersHashPasswordSync);

      const result = await userController.updateUserProfile(
        { user_id: expectedUsers[0].user_id },
        {
          updateUserDto: {
            username: expectedUsers[0].username,
            password: expectedUsers[0].password,
          },
          fileExtension: '',
        },
        req,
      );

      const token = jwtSimple.encode(
        expectedUsersHashPasswordSync[0],
        process.env.JWT_SECRET as string,
      );

      expect(result).toEqual({
        userInfo: {
          user_id: expectedUsers[0].user_id,
          email: expectedUsers[0].email,
          username: expectedUsers[0].username,
          role: expectedUsers[0].role,
          profile_picture_url: expectedUsers[0].profile_picture_url,
        },
        token,
      });
    });

    it('should return that user after updating a user profile', async () => {
      const expectedUsersHashPasswordSync = await expectedUsersHashPassword();
      jest
        .spyOn(userService, 'updateUserProfile')
        .mockResolvedValue(expectedUsersHashPasswordSync);

      const result = await userController.updateUserProfile(
        { user_id: expectedUsers[0].user_id },
        {
          updateUserDto: { username: expectedUsers[0].username },
          fileExtension: '',
        },
        req,
      );

      const token = jwtSimple.encode(
        expectedUsersHashPasswordSync[0],
        process.env.JWT_SECRET as string,
      );

      expect(result).toEqual({
        userInfo: {
          user_id: expectedUsers[0].user_id,
          email: expectedUsers[0].email,
          username: expectedUsers[0].username,
          role: expectedUsers[0].role,
          profile_picture_url: expectedUsers[0].profile_picture_url,
        },
        token,
      });
    });

    it('cannot update the user profile if the new username already exists or it is different from the original username', async () => {
      jest
        .spyOn(userService, 'getUsers')
        .mockResolvedValue([{ ...expectedUsers[0], username: 'ttiimmothy' }]);
      const result = await userController.updateUserProfile(
        { user_id: expectedUsers[0].user_id },
        {
          updateUserDto: { username: 'ttiimmothy' },
          fileExtension: '',
        },
        req,
      );

      expect(result).toEqual({
        message:
          'The username cannot be updated because this username is already used',
      });
    });

    it('cannot update the user profile if the new email already exists or it is different from the original email', async () => {
      jest
        .spyOn(userService, 'getUsers')
        .mockResolvedValue([
          { ...expectedUsers[0], email: 'timothyemail805@gmail.com' },
        ]);
      const result = await userController.updateUserProfile(
        { user_id: expectedUsers[0].user_id },
        {
          updateUserDto: { email: 'timothyemail805@gmail.com' },
          fileExtension: '',
        },
        req,
      );

      expect(result).toEqual({
        message:
          'The email cannot be updated because this email is already used',
      });
    });

    it('should return user cannot be found message if the user cannot be found', async () => {
      jest.spyOn(userService, 'getUserByID').mockResolvedValue(null);
      const result = await userController.updateUserProfile(
        {
          user_id: expectedUsers[0].user_id,
        },
        {
          updateUserDto: { username: expectedUsers[0].username },
          fileExtension: '',
        },
        req,
      );
      expect(result).toEqual({ message: 'This user cannot be found' });
    });
  });

  describe('deleteUser', () => {
    it('should return that user after changing the active state of a user', async () => {
      const result = await userController.deleteUser({
        user_id: expectedUsers[0].user_id,
      });
      expect(result).toEqual(expectedUsers[0]);
    });

    it('should return user cannot be found message if the user cannot be found', async () => {
      jest.spyOn(userService, 'getUserByID').mockResolvedValue(null);
      const result = await userController.deleteUser({
        user_id: expectedUsers[0].user_id,
      });
      expect(result).toEqual({ message: 'This user cannot be found' });
    });
  });
});
