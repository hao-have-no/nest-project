import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuardService } from './guard/jwt-guard.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuardService)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
