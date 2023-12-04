import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { PhotoService } from '../photo.service';
import { expectedUsers } from '../../userRelated/user/specs/expectedUsers';
import { expectedRestaurants } from '../../restaurant/specs/expectedRestaurants';
import { expectedDistricts } from '../../district/specs/expectedDistricts';
import { expectedReviews } from '../../review/specs/expectedReviews';
import { expectedPhotoCategories } from '../../photoCategory/specs/expectedPhotoCategories';
import { expectedReviewPhotos } from './expectedReviewPhotos';

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('PhotoService', () => {
  let photoService: PhotoService;
  let reviewPhotoIDs: { review_photo_id: string }[];
  let menuPhotoIDs: { menu_photo_id: string }[];
  let userIDs: { user_id: string }[];
  let districtIDs: { district_id: string }[];
  let restaurantIDs: { restaurant_id: string }[];
  let reviewIDs: { review_id: string }[];
  let photoCategoryIDs: { photo_category_id: string }[];

  beforeAll(async () => {
    photoService = new PhotoService(knex);
  });

  beforeEach(async () => {
    districtIDs = await knex
      .insert({
        name: expectedDistricts[0].name,
      })
      .into('district')
      .returning('district_id');

    userIDs = await knex
      .insert({
        username: expectedUsers[0].username,
        email: expectedUsers[0].email,
        password: expectedUsers[0].password,
        role: expectedUsers[0].role,
      })
      .into('user')
      .returning('user_id');

    restaurantIDs = await knex
      .insert({
        name: expectedRestaurants[0].name,
        address: expectedRestaurants[0].address,
        district_id: districtIDs[0].district_id,
        latitude: expectedRestaurants[0].latitude,
        longitude: expectedRestaurants[0].longitude,
        postal_code: expectedRestaurants[0].postal_code,
        phone: expectedRestaurants[0].phone,
        intro: expectedRestaurants[0].intro,
        opening_hours: expectedRestaurants[0].opening_hours,
      })
      .into('restaurant')
      .returning('restaurant_id');

    reviewIDs = await knex
      .insert({
        user_id: userIDs[0].user_id,
        restaurant_id: restaurantIDs[0].restaurant_id,
        title: expectedReviews[0].title,
        content: expectedReviews[0].content,
        rating: expectedReviews[0].rating,
        spending: expectedReviews[0].spending,
        visited_date: expectedReviews[0].visited_date,
      })
      .into('review')
      .returning('review_id');

    photoCategoryIDs = await knex
      .insert({
        name: expectedPhotoCategories[0].name,
      })
      .into('photo_category')
      .returning('photo_category_id');

    reviewPhotoIDs = await knex
      .insert({
        photo_category_id: photoCategoryIDs[0].photo_category_id,
        review_id: reviewIDs[0].review_id,
        photo_url: expectedReviewPhotos[0].photo_url,
      })
      .into('review_photo')
      .returning('review_photo_id');
  });

  describe('getPhotos', () => {
    it('should return review photos', async () => {
      const result = await photoService.getPhotos();
      const photoFiltered = result.filter(
        (photo) => photo.review_photo_id === reviewPhotoIDs[0].review_photo_id,
      );
      expect(photoFiltered).toMatchObject([
        {
          photo_category_id: photoCategoryIDs[0].photo_category_id,
          review_id: reviewIDs[0].review_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        },
      ]);
    });
  });

  describe('getPhotoByID', () => {
    it('should return review photo of that review photo id', async () => {
      const result = await photoService.getPhotoByID(
        reviewPhotoIDs[0].review_photo_id,
      );
      expect(result).toMatchObject([
        {
          photo_category_id: photoCategoryIDs[0].photo_category_id,
          review_id: reviewIDs[0].review_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        },
      ]);
    });

    it('should return review photo of that review photo id', async () => {
      await knex('review_photo')
        .whereIn(
          'review_photo_id',
          reviewPhotoIDs.map((reviewPhotoID) => reviewPhotoID.review_photo_id),
        )
        .del();

      const photoCategory = await knex
        .insert({
          name: 'Menu',
        })
        .into('photo_category')
        .returning('*');

      const photo_category_id = photoCategory.filter(
        (photoCategory) => photoCategory.name === 'Menu',
      )[0].photo_category_id;

      menuPhotoIDs = await knex
        .insert({
          photo_category_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        })
        .into('menu_photo')
        .returning('menu_photo_id');

      photoCategoryIDs.push({
        photo_category_id: photoCategory[0].photo_category_id,
      });
      const result = await photoService.getPhotoByID(
        menuPhotoIDs[0].menu_photo_id,
      );
      expect(result).toMatchObject([
        {
          photo_category_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        },
      ]);
    });
  });

  describe('getReviewPhotos', () => {
    it('should return photos in review category', async () => {
      const photoCategories = await knex
        .insert({
          name: 'Review',
        })
        .into('photo_category')
        .returning('*');

      const photo_category_id = photoCategories.filter(
        (photoCategory) => photoCategory.name === 'Review',
      )[0].photo_category_id;

      const reviewPhotoID = await knex
        .insert({
          photo_category_id,
          review_id: reviewIDs[0].review_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        })
        .into('review_photo')
        .returning('review_photo_id');

      reviewPhotoIDs.push({
        review_photo_id: reviewPhotoID[0].review_photo_id,
      });

      photoCategoryIDs.push({
        photo_category_id: photoCategories[0].photo_category_id,
      });

      const result = await photoService.getReviewPhotos(
        restaurantIDs[0].restaurant_id,
      );
      const photoFiltered = result.filter(
        (photo) => photo.review_photo_id === reviewPhotoID[0].review_photo_id,
      );
      expect(photoFiltered).toMatchObject([
        {
          photo_category_id,
          review_id: reviewIDs[0].review_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        },
      ]);
    });
  });

  describe('getMenuPhotos', () => {
    it('should return photos in menu category', async () => {
      const photoCategory = await knex
        .insert({
          name: 'Menu',
        })
        .into('photo_category')
        .returning('*');

      const photo_category_id = photoCategory.filter(
        (photoCategory) => photoCategory.name === 'Menu',
      )[0].photo_category_id;

      menuPhotoIDs = await knex
        .insert({
          photo_category_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        })
        .into('menu_photo')
        .returning('menu_photo_id');

      photoCategoryIDs.push({
        photo_category_id: photoCategory[0].photo_category_id,
      });

      const result = await photoService.getMenuPhotos(
        restaurantIDs[0].restaurant_id,
      );
      const photoFiltered = result.filter(
        (photo) => photo.menu_photo_id === menuPhotoIDs[0].menu_photo_id,
      );
      expect(photoFiltered).toMatchObject([
        {
          photo_category_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        },
      ]);
    });
  });

  describe('createPhoto', () => {
    it('should return that photo after creating a photo if image prefix, restaurant id and image name exist', async () => {
      const result = await photoService.createPhoto(
        {
          photo_category_id: photoCategoryIDs[0].photo_category_id,
          review_id: reviewIDs[0].review_id,
          photo_url: expectedReviewPhotos[0].photo_url,
          restaurantID: restaurantIDs[0].restaurant_id,
          imageName: expectedReviewPhotos[0].photo_url,
        },
        photoCategoryIDs[0].photo_category_id,
        expectedPhotoCategories[0].name,
      );

      menuPhotoIDs = [{ menu_photo_id: result[0].menu_photo_id }];

      expect(result).toMatchObject([
        {
          photo_category_id: photoCategoryIDs[0].photo_category_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          photo_url: `${process.env.IMAGE_PREFIX}/restaurant/${
            restaurantIDs[0].restaurant_id
          }/${expectedPhotoCategories[0].name.toLowerCase()}s/${
            expectedReviewPhotos[0].photo_url
          }`,
        },
      ]);
    });
  });

  describe('deletePhoto', () => {
    it('should return that photo after changing the active state of a photo', async () => {
      const result = await photoService.deletePhoto(
        reviewPhotoIDs[0].review_photo_id,
      );
      expect(result).toMatchObject([
        {
          photo_category_id: photoCategoryIDs[0].photo_category_id,
          review_id: reviewIDs[0].review_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        },
      ]);
    });

    describe('getPhotoCategoryID', () => {
      it('should get the photo category id of a specific photo category name', async () => {
        const menuPhotoCategoryID = await knex
          .insert({ name: 'Menu' })
          .into('photo_category')
          .returning('photo_category_id');

        photoCategoryIDs.push({
          photo_category_id: menuPhotoCategoryID[0].photo_category_id,
        });

        const result = await photoService.getPhotoCategoryID('Menu');
        const photoCategoryIDFiltered = result.filter(
          (photoCategoryID) =>
            photoCategoryID.photo_category_id ===
            menuPhotoCategoryID[0].photo_category_id,
        );
        expect(photoCategoryIDFiltered).toMatchObject([
          {
            photo_category_id: menuPhotoCategoryID[0].photo_category_id,
          },
        ]);
      });
    });
  });

  afterEach(async () => {
    if (menuPhotoIDs && menuPhotoIDs.length > 0) {
      await knex('menu_photo')
        .whereIn(
          'menu_photo_id',
          menuPhotoIDs.map((menuPhotoID) => menuPhotoID.menu_photo_id),
        )
        .del();
    }

    await knex('review_photo')
      .whereIn(
        'review_photo_id',
        reviewPhotoIDs.map((reviewPhotoID) => reviewPhotoID.review_photo_id),
      )
      .del();

    await knex('photo_category')
      .whereIn(
        'photo_category_id',
        photoCategoryIDs.map(
          (photoCategoryID) => photoCategoryID.photo_category_id,
        ),
      )
      .del();

    await knex('review')
      .whereIn(
        'review_id',
        reviewIDs.map((reviewID) => reviewID.review_id),
      )
      .del();

    const menuPhotos = await knex
      .select('*')
      .from('menu_photo')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      );

    if (menuPhotos.length === 0) {
      await knex('restaurant')
        .whereIn(
          'restaurant_id',
          restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
        )
        .del();

      await knex('district')
        .whereIn(
          'district_id',
          districtIDs.map((districtID) => districtID.district_id),
        )
        .del();
    }

    await knex('user')
      .whereIn(
        'user_id',
        userIDs.map((userID) => userID.user_id),
      )
      .del();
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
