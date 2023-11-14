import { Injectable, NestMiddleware } from '@nestjs/common';
import { CspService } from './csp.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CspMiddleware implements NestMiddleware {
  constructor(private readonly cspService: CspService) {}

  use(_: Request, res: Response, next: NextFunction) {
    const cspPolicy = this.cspService.getCspHeader();
    res.setHeader('Content-Security-Policy', cspPolicy);

    next();
  }
}
