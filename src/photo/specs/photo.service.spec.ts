import * as dotenv from 'dotenv';
import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { PhotoService } from '../photo.service';
import { expectedUsers } from '../../userRelated/user/specs/expectedUsers';
import { expectedRestaurants } from '../../restaurant/specs/expectedRestaurants';
import { expectedDistricts } from '../../district/specs/expectedDistricts';
import { expectedReviews } from '../../review/specs/expectedReviews';
import { expectedPhotoCategories } from '../../photoCategory/specs/expectedPhotoCategories';
import { expectedPhotos } from './expectedPhotos';

dotenv.config();

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('PhotoService', () => {
  let photoService: PhotoService;
  let photoIDs: { photo_id: string }[];
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

    photoIDs = await knex
      .insert({
        photo_category_id: photoCategoryIDs[0].photo_category_id,
        review_id: reviewIDs[0].review_id,
        address: expectedPhotos[0].address,
      })
      .into('photo')
      .returning('photo_id');
  });

  describe('getPhotos', () => {
    it('should return photos', async () => {
      const result = await photoService.getPhotos();
      const photoFiltered = result.filter(
        (photo) => photo.photo_id === photoIDs[0].photo_id,
      );
      expect(photoFiltered).toMatchObject([
        {
          photo_category_id: photoCategoryIDs[0].photo_category_id,
          review_id: reviewIDs[0].review_id,
          address: expectedPhotos[0].address,
        },
      ]);
    });
  });

  describe('getPhotoByID', () => {
    it('should return photo of that photo id', async () => {
      const result = await photoService.getPhotoByID(photoIDs[0].photo_id);
      expect(result).toMatchObject([
        {
          photo_category_id: photoCategoryIDs[0].photo_category_id,
          review_id: reviewIDs[0].review_id,
          address: expectedPhotos[0].address,
        },
      ]);
    });
  });

  describe('createPhoto', () => {
    it('should return that photo after creating a photo', async () => {
      const result = await photoService.createPhoto({
        photo_category_id: photoCategoryIDs[0].photo_category_id,
        review_id: reviewIDs[0].review_id,
        address: expectedPhotos[0].address,
      });

      photoIDs.push({ photo_id: result[0].photo_id });

      expect(result).toMatchObject([
        {
          photo_category_id: photoCategoryIDs[0].photo_category_id,
          review_id: reviewIDs[0].review_id,
          address: expectedPhotos[0].address,
        },
      ]);
    });
  });

  describe('deletePhoto', () => {
    it('should return that photo after changing the active state of a photo', async () => {
      const result = await photoService.deletePhoto(photoIDs[0].photo_id);
      expect(result).toMatchObject([
        {
          photo_category_id: photoCategoryIDs[0].photo_category_id,
          review_id: reviewIDs[0].review_id,
          address: expectedPhotos[0].address,
        },
      ]);
    });
  });

  afterEach(async () => {
    await knex('photo')
      .whereIn(
        'photo_id',
        photoIDs.map((photoID) => photoID.photo_id),
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

    await knex('restaurant')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      )
      .del();

    await knex('user')
      .whereIn(
        'user_id',
        userIDs.map((userID) => userID.user_id),
      )
      .del();

    await knex('district')
      .whereIn(
        'district_id',
        districtIDs.map((districtID) => districtID.district_id),
      )
      .del();
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
