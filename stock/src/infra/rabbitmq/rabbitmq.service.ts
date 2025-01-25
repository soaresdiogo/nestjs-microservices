import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publish(exchange: string, routingKey: string, data: any) {
    this.amqpConnection.publish(exchange, routingKey, data);
  }
}