import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { expectedUsers } from './expectedUsers';

jest.mock('../user.service');

describe('UserController', () => {
  let user: TestingModule;
  let userController: UserController;
  let userService: UserService;

  beforeAll(async () => {
    user = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = user.get<UserController>(UserController);
    userService = user.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.spyOn(userService, 'getUsers').mockResolvedValue(expectedUsers);
    jest.spyOn(userService, 'getUserByID').mockResolvedValue(expectedUsers);
    jest.spyOn(userService, 'updateUser').mockResolvedValue(expectedUsers);
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

  describe('updateUser', () => {
    it('should return that user after updating a user', async () => {
      const result = await userController.updateUser(
        { user_id: expectedUsers[0].user_id },
        {
          username: expectedUsers[0].username,
        },
      );
      expect(result).toEqual(expectedUsers[0]);
    });

    it('should return user cannot be found message if the user cannot be found', async () => {
      jest.spyOn(userService, 'getUserByID').mockResolvedValue(null);
      const result = await userController.updateUser(
        {
          user_id: expectedUsers[0].user_id,
        },
        {
          username: expectedUsers[0].username,
        },
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
