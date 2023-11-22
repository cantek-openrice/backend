import { Test, TestingModule } from '@nestjs/testing';
import { PhotoController } from '../photo.controller';
import { PhotoService } from '../photo.service';
import { expectedPhotos } from './expectedPhotos';

jest.mock('../photo.service');

describe('PhotoController', () => {
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
    jest
      .spyOn(photoService, 'getReviewPhotos')
      .mockResolvedValue(expectedPhotos);
    jest.spyOn(photoService, 'getMenuPhotos').mockResolvedValue(expectedPhotos);
    jest.spyOn(photoService, 'createPhoto').mockResolvedValue(expectedPhotos);
    jest.spyOn(photoService, 'deletePhoto').mockResolvedValue(expectedPhotos);
  });

  describe('getPhotos', () => {
    it('should return photos', async () => {
      const result = await photoController.getPhotos();
      expect(result).toEqual(expectedPhotos);
    });
  });

  describe('getPhotoByID', () => {
    it('should return photo of that photo id', async () => {
      const result = await photoController.getPhotoByID({
        photo_id: expectedPhotos[0].photo_id,
      });
      expect(result).toEqual(expectedPhotos[0]);
    });
  });

  describe('getReviewPhotos', () => {
    it('should return review photos', async () => {
      const result = await photoController.getReviewPhotos('123');
      expect(result).toEqual(expectedPhotos);
    });
  });

  describe('getMenuPhotos', () => {
    it('should return menu photos', async () => {
      const result = await photoController.getMenuPhotos('123');
      expect(result).toEqual(expectedPhotos);
    });
  });

  describe('createPhoto', () => {
    it('should return that photo after creating a photo', async () => {
      const result = await photoController.createPhoto({
        photo_category_id: expectedPhotos[0].photo_category_id,
        review_id: expectedPhotos[0].review_id,
        photo_url: expectedPhotos[0].photo_url,
      });
      expect(result).toEqual(expectedPhotos[0]);
    });
  });

  describe('deletePhoto', () => {
    it('should return that photo after changing the active state of a photo', async () => {
      const result = await photoController.deletePhoto({
        photo_id: expectedPhotos[0].photo_id,
      });
      expect(result).toEqual(expectedPhotos[0]);
    });

    it('should return photo cannot be found message if the photo cannot be found', async () => {
      jest.spyOn(photoService, 'getPhotoByID').mockResolvedValue(null);
      const result = await photoController.deletePhoto({
        photo_id: expectedPhotos[0].photo_id,
      });
      expect(result).toEqual({
        message: 'This photo cannot be found',
      });
    });
  });
});
