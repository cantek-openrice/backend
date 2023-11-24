import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response, NextFunction } from 'express';
import { CspMiddleware } from '../csp.middleware';
import { CspService } from '../csp.service';

describe('CspMiddleware', () => {
  let csp: TestingModule;
  let cspMiddleware: CspMiddleware;
  let cspService: CspService;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeAll(async () => {
    csp = await Test.createTestingModule({
      imports: [],
      providers: [CspService],
    }).compile();
    cspService = csp.get<CspService>(CspService);
    cspMiddleware = new CspMiddleware(cspService);
  });

  beforeEach(() => {
    jest
      .spyOn(cspService, 'getCspHeader')
      .mockReturnValue("script-src 'self' 'unsafe-inline'");
    res = {
      setHeader: jest.fn(),
    } as any as Response;
    next = jest.fn();
  });

  describe('setHeader', () => {
    it('should set the header as the csp policy state in the csp service', async () => {
      cspMiddleware.use(req, res, next);
      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Security-Policy',
        "script-src 'self' 'unsafe-inline'",
      );
      expect(next).toHaveBeenCalled();
    });
  });
});
