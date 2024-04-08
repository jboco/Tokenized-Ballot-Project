import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ethers} from 'ethers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('token-address')
  getTokenAddress() {
    return { result: this.appService.getTokenAddress() };
  }
}
