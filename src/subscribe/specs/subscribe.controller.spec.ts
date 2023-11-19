import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeController } from '../subscribe.controller';
import { SubscribeService } from '../subscribe.service';
import { expectedSubscribes } from './expectedSubscribes';

jest.mock('../subscribe.service');

describe('SubscribeController', () => {
  let subscribe: TestingModule;
  let subscribeController: SubscribeController;
  let subscribeService: SubscribeService;

  beforeAll(async () => {
    subscribe = await Test.createTestingModule({
      controllers: [SubscribeController],
      providers: [SubscribeService],
    }).compile();

    subscribeController =
      subscribe.get<SubscribeController>(SubscribeController);
    subscribeService = subscribe.get<SubscribeService>(SubscribeService);
  });

  beforeEach(() => {
    jest
      .spyOn(subscribeService, 'getSubscribes')
      .mockResolvedValue(expectedSubscribes);
    jest
      .spyOn(subscribeService, 'getSubscribeByID')
      .mockResolvedValue(expectedSubscribes);
    jest
      .spyOn(subscribeService, 'createSubscribe')
      .mockResolvedValue(expectedSubscribes);
    jest
      .spyOn(subscribeService, 'deleteSubscribe')
      .mockResolvedValue(expectedSubscribes);
  });

  describe('getSubscribes', () => {
    it('should return subscribes', async () => {
      const result = await subscribeController.getSubscribes();
      expect(result).toEqual(expectedSubscribes);
    });
  });

  describe('getSubscribeByID', () => {
    it('should return subscribe of that subscribe id', async () => {
      const result = await subscribeController.getSubscribeByID({
        subscribe_id: '123',
      });
      expect(result).toEqual(expectedSubscribes[0]);
    });
  });

  describe('createSubscribe', () => {
    it('should return that subscribe after creating a subscribe', async () => {
      const result = await subscribeController.createSubscribe({
        user_id: '123',
        restaurant_id: '123',
      });
      expect(result).toEqual(expectedSubscribes[0]);
    });
  });

  describe('deleteSubscribe', () => {
    it('should return that subscribe after changing the active state of a subscribe', async () => {
      const result = await subscribeController.deleteSubscribe({
        subscribe_id: '123',
      });
      expect(result).toEqual(expectedSubscribes[0]);
    });
  });
});
