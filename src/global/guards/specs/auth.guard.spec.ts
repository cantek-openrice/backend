import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../../../userRelated/auth/auth.service';
import { expectedUsers } from '../../../userRelated/user/specs/expectedUsers';

jest.mock('../../../userRelated/auth/auth.service.ts');

describe('AuthGuard', () => {
  let auth: TestingModule;
  let authGuard: AuthGuard;
  let authService: AuthService;

  beforeAll(async () => {
    auth = await Test.createTestingModule({
      imports: [AuthService],
    }).compile();

    authService = auth.get<AuthService>(AuthService);
    authGuard = new AuthGuard(authService);
  });

  describe('validation', () => {
    it('cannot process to next step if the token is null', async () => {
      const context = createMock<ExecutionContext>();
      context.switchToHttp().getRequest.mockReturnValue({
        headers: {
          authorization: 'Bearer null',
        },
      });
      expect(authGuard.canActivate(context)).toBeFalsy();
    });

    it('cannot process to next step if the token cannot be validated', async () => {
      const context = createMock<ExecutionContext>();
      context.switchToHttp().getRequest.mockReturnValue({
        headers: {
          authorization: 'Bearer 123',
        },
      });
      expect(authGuard.canActivate(context)).toBeFalsy();
    });

    it('should process to next step and there will be a user in request if the token cannot be validated', async () => {
      jest
        .spyOn(authService, 'validateToken')
        .mockResolvedValue(expectedUsers[0]);

      const context = createMock<ExecutionContext>();
      context.switchToHttp().getRequest.mockReturnValue({
        headers: {
          authorization: 'Bearer 123',
        },
      });

      expect(authGuard.canActivate(context)).toBeTruthy();
    });
  });
});
