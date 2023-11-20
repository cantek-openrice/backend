import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { PhotoCategoryService } from '../photoCategory.service';
import { expectedPhotoCategories } from './expectedPhotoCategories';

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('PhotoCategoryService', () => {
  let photoCategoryService: PhotoCategoryService;
  let photoCategoryIDs: { photo_category_id: string }[];

  beforeAll(async () => {
    photoCategoryService = new PhotoCategoryService(knex);
  });

  beforeEach(async () => {
    photoCategoryIDs = await knex
      .insert({
        name: expectedPhotoCategories[0].name,
      })
      .into('photo_category')
      .returning('photo_category_id');
  });

  describe('getPhotoCategories', () => {
    it('should return photo categories', async () => {
      const result = await photoCategoryService.getPhotoCategories();
      const photoCategoryFiltered = result.filter(
        (photoCategory) =>
          photoCategory.photo_category_id ===
          photoCategoryIDs[0].photo_category_id,
      );
      expect(photoCategoryFiltered).toMatchObject([
        {
          name: expectedPhotoCategories[0].name,
        },
      ]);
    });
  });

  describe('getPhotoCategoryByID', () => {
    it('should return photo category of that photo category id', async () => {
      const result = await photoCategoryService.getPhotoCategoryByID(
        photoCategoryIDs[0].photo_category_id,
      );
      expect(result).toMatchObject([
        {
          name: expectedPhotoCategories[0].name,
        },
      ]);
    });
  });

  afterEach(async () => {
    const photos = await knex
      .select('*')
      .from('photo')
      .whereIn(
        'photo_category_id',
        photoCategoryIDs.map(
          (photoCategoryID) => photoCategoryID.photo_category_id,
        ),
      );

    if (photos.length === 0) {
      await knex('photo_category')
        .whereIn(
          'photo_category_id',
          photoCategoryIDs.map(
            (photoCategoryID) => photoCategoryID.photo_category_id,
          ),
        )
        .del();
    }
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
