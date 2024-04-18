import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getMain(): string {
    return 'Backend is up and running';
  }
}
