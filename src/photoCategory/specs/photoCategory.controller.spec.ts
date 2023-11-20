import { Test, TestingModule } from '@nestjs/testing';
import { PhotoCategoryController } from '../photoCategory.controller';
import { PhotoCategoryService } from '../photoCategory.service';
import { expectedPhotoCategories } from './expectedPhotoCategories';

jest.mock('../photoCategory.service');

describe('PhotoCategoryController', () => {
  let photoCategory: TestingModule;
  let photoCategoryController: PhotoCategoryController;
  let photoCategoryService: PhotoCategoryService;

  beforeAll(async () => {
    photoCategory = await Test.createTestingModule({
      controllers: [PhotoCategoryController],
      providers: [PhotoCategoryService],
    }).compile();

    photoCategoryController = photoCategory.get<PhotoCategoryController>(
      PhotoCategoryController,
    );
    photoCategoryService =
      photoCategory.get<PhotoCategoryService>(PhotoCategoryService);
  });

  beforeEach(() => {
    jest
      .spyOn(photoCategoryService, 'getPhotoCategories')
      .mockResolvedValue(expectedPhotoCategories);
    jest
      .spyOn(photoCategoryService, 'getPhotoCategoryByID')
      .mockResolvedValue(expectedPhotoCategories);
  });

  describe('getPhotoCategories', () => {
    it('should return photo categories', async () => {
      const result = await photoCategoryController.getPhotoCategories();
      expect(result).toEqual(expectedPhotoCategories);
    });
  });

  describe('getPhotoCategoryByID', () => {
    it('should return photo category of that photo category id', async () => {
      const result = await photoCategoryController.getPhotoCategoryByID({
        photo_category_id: '123',
      });
      expect(result).toEqual(expectedPhotoCategories[0]);
    });
  });
});
