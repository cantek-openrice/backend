import { Controller, Get } from '@nestjs/common';

@Controller()
export class StaticExpressController {
  @Get('static')
  root(): string {
    return;
  }
}
