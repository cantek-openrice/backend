import { Test, TestingModule } from '@nestjs/testing';
import { PhotoController } from '../photo.controller';
import { PhotoService } from '../photo.service';
import { expectedPhotoCategories } from '../../photoCategory/specs/expectedPhotoCategories';
import { expectedReviewPhotos } from './expectedReviewPhotos';

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
    jest
      .spyOn(photoService, 'getPhotos')
      .mockResolvedValue(expectedReviewPhotos);
    jest
      .spyOn(photoService, 'getPhotoByID')
      .mockResolvedValue(expectedReviewPhotos);
    jest
      .spyOn(photoService, 'getReviewPhotos')
      .mockResolvedValue(expectedReviewPhotos);
    jest
      .spyOn(photoService, 'getMenuPhotos')
      .mockResolvedValue(expectedReviewPhotos);
    jest
      .spyOn(photoService, 'createPhoto')
      .mockResolvedValue(expectedReviewPhotos);
    jest
      .spyOn(photoService, 'deletePhoto')
      .mockResolvedValue(expectedReviewPhotos);
    jest
      .spyOn(photoService, 'getPhotoCategoryID')
      .mockResolvedValue([
        { photo_category_id: expectedReviewPhotos[0].photo_category_id },
      ]);
  });

  describe('getPhotos', () => {
    it('should return photos', async () => {
      const result = await photoController.getPhotos();
      expect(result).toEqual(expectedReviewPhotos);
    });
  });

  describe('getPhotoByID', () => {
    it('should return photo of that photo id', async () => {
      const result = await photoController.getPhotoByID({
        photo_id: expectedReviewPhotos[0].review_photo_id,
      });
      expect(result).toEqual(expectedReviewPhotos[0]);
    });
  });

  describe('getReviewPhotos', () => {
    it('should return review photos', async () => {
      const result = await photoController.getReviewPhotos('123');
      expect(result).toEqual(expectedReviewPhotos);
    });
  });

  describe('getMenuPhotos', () => {
    it('should return menu photos', async () => {
      const result = await photoController.getMenuPhotos('123');
      expect(result).toEqual(expectedReviewPhotos);
    });
  });

  describe('createPhoto', () => {
    it('should return that photo after creating a photo', async () => {
      const result = await photoController.createPhoto(
        {
          photo_category_id: expectedReviewPhotos[0].photo_category_id,
          review_id: expectedReviewPhotos[0].review_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        },
        expectedPhotoCategories[0].name,
      );
      expect(result).toEqual(expectedReviewPhotos[0]);
    });
  });

  describe('deletePhoto', () => {
    it('should return that photo after changing the active state of a photo', async () => {
      const result = await photoController.deletePhoto({
        photo_id: expectedReviewPhotos[0].review_photo_id,
      });
      expect(result).toEqual(expectedReviewPhotos[0]);
    });

    it('should return photo cannot be found message if the photo cannot be found', async () => {
      jest.spyOn(photoService, 'getPhotoByID').mockResolvedValue(null);
      const result = await photoController.deletePhoto({
        photo_id: expectedReviewPhotos[0].review_photo_id,
      });
      expect(result).toEqual({
        message: 'This photo cannot be found',
      });
    });
  });
});
