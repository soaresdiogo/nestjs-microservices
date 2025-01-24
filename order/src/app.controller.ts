import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './models/dto/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() messageDto: MessageDto) {
    return this.appService.publishMessage(messageDto);
  }
}
