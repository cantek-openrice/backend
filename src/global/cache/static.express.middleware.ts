import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import * as express from 'express';

@Injectable()
export class StaticExpressMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const staticPath = join(__dirname, '..', '..', '..', '..', 'public');
    express.static(staticPath)(req, res, next);
  }
}
