import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @RabbitSubscribe({
    exchange: 'order',
    routingKey: 'stock',
    queue: 'stock-queue',
  })
  public async pubSubHandler(data: any) {
    console.log('Received message:', JSON.stringify(data));
    this.appService.consumeMessage(data.message);
  }
}