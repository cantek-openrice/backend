import { Injectable } from '@nestjs/common';

@Injectable()
export class CspService {
  getCspHeader(): string {
    return "script-src 'self' 'unsafe-inline'";
  }
}
