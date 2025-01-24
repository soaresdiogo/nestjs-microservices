import { Injectable } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { MessageDto } from './models/dto/message.dto';

@Injectable()
export class AppService {
  constructor(private readonly rabbitMq: RabbitmqService) {}

  public publishMessage(messageDto: MessageDto): void {
    console.log('Publishing message:', JSON.stringify(messageDto));
  this.rabbitMq.publish('order', 'stock', messageDto);
  }
}

