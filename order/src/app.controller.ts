import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './models/dto/message.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StockDto } from './models/dto/stock.dto';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiOperation({
    summary: 'Send message to RabbitMQ to subtract stock',
  })
  @ApiBody({
    description: 'Body to send message to RabbitMQ',
    type: StockDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Message sent successfully',
    schema: {
      example: {
        id: 'l1uv5hmgm8s0zs3psn2z5x92',
        quantity: 1
      },
    },
  })
  async create(@Body() messageDto: MessageDto) {
    return this.appService.publishMessage(messageDto);
  }
}
