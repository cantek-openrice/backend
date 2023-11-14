import { Controller, Get } from '@nestjs/common';

@Controller()
export class StaticController {
  @Get('static')
  root(): string {
    return;
  }
}
