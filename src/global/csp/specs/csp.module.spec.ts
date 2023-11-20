import { Test, TestingModule } from '@nestjs/testing';
import { MiddlewareConsumer } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { CspModule } from '../csp.module';
import { CspMiddleware } from '../csp.middleware';

describe('CspModule', () => {
  let csp: TestingModule;
  let cspModule: CspModule;
  const middlewareConsumer = createMock<MiddlewareConsumer>();

  beforeAll(async () => {
    csp = await Test.createTestingModule({
      imports: [CspModule],
    }).compile();
    cspModule = csp.get<CspModule>(CspModule);
  });

  describe('initializeTheModule', () => {
    it('should compile the appModule', async () => {
      cspModule.configure(middlewareConsumer);
      expect(module).toBeDefined();
      expect(middlewareConsumer.apply).toHaveBeenCalledWith(CspMiddleware);
    });
  });
});
