import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

jest.mock('./global/modules/knex.module.ts');
jest.mock('./dish/dish.service.ts');
jest.mock('./district/district.service.ts');
jest.mock('./paymentMethod/paymentMethod.service.ts');
jest.mock('./photo/photo.service.ts');
jest.mock('./photoCategory/photoCategory.service.ts');
jest.mock('./restaurant/restaurant.service.ts');
jest.mock('./restaurantDish/restaurantDish.service.ts');
jest.mock('./restaurantOwner/restaurantOwner.service.ts');
jest.mock('./restaurantPayment/restaurantPayment.service.ts');
jest.mock('./review/review.service.ts');
jest.mock('./subscribe/subscribe.service.ts');
jest.mock('./userRelated/auth/auth.service.ts');
jest.mock('./userRelated/user/user.service.ts');

describe('AppModule', () => {
  describe('initializeTheModule', () => {
    it('should compile the appModule', async () => {
      const module = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      expect(module).toBeDefined();
    });
  });
});
