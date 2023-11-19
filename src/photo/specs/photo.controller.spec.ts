import { Test, TestingModule } from '@nestjs/testing';
import { PhotoController } from '../photo.controller';
import { PhotoService } from '../photo.service';
import { expectedPhotos } from './expectedPhotos';

jest.mock('../photo.service');

describe('photoController', () => {
  let photo: TestingModule;
  let photoController: PhotoController;
  let photoService: PhotoService;

  beforeAll(async () => {
    photo = await Test.createTestingModule({
      controllers: [PhotoController],
      providers: [PhotoService],
    }).compile();

    photoController = photo.get<PhotoController>(PhotoController);
    photoService = photo.get<PhotoService>(PhotoService);
  });

  beforeEach(() => {
    jest.spyOn(photoService, 'getPhotos').mockResolvedValue(expectedPhotos);
    jest.spyOn(photoService, 'getPhotoByID').mockResolvedValue(expectedPhotos);
    jest.spyOn(photoService, 'createPhoto').mockResolvedValue(expectedPhotos);
    jest.spyOn(photoService, 'deletePhoto').mockResolvedValue(expectedPhotos);
  });

  describe('getPhotos', () => {
    it('should return photo', async () => {
      const result = await photoController.getPhotos();
      expect(result).toEqual(expectedPhotos);
    });
  });

  describe('getPhotoByID', () => {
    it('should return photo of that photo id', async () => {
      const result = await photoController.getPhotoByID({
        photo_id: '123',
      });
      expect(result).toEqual(expectedPhotos[0]);
    });
  });

  describe('createPhoto', () => {
    it('should return that photo after creating a photo', async () => {
      const result = await photoController.createPhoto({
        photo_category_id: '123',
        review_id: '123',
        address: 'address',
      });
      expect(result).toEqual(expectedPhotos[0]);
    });
  });

  describe('deletePhoto', () => {
    it('should return that photo after changing the active state of a photo', async () => {
      const result = await photoController.deletePhoto({
        photo_id: '123',
      });
      expect(result).toEqual(expectedPhotos[0]);
    });
  });
});
