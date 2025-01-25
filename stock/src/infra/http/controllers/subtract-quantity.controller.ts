import { Controller } from '@nestjs/common';

import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { StockService } from '@/infra/rabbitmq/services/stock.service';
import { z } from 'zod';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

const subtractQuantitySchema = z.object({
  id: z.string(),
  quantity: z.number().min(1),
});

type SubtractQuantitySchema = z.infer<typeof subtractQuantitySchema>;

@Controller()
export class SubtractQuantityController {
  constructor(private readonly stockService: StockService) {}

  @RabbitSubscribe({
    exchange: 'order',
    routingKey: 'stock',
    queue: 'stock-queue',
  })
  public async pubSubHandler(data: SubtractQuantitySchema) {
    console.log('Received message:', JSON.stringify(data));
    try {
      console.log('Received and validated message:', JSON.stringify(data));
      await this.stockService.subtractQuantity({
        id: new UniqueEntityID(data.id),
        quantity: data.quantity,
      });
    } catch (error) {
      console.error('Validation failed:', error.errors);
    }
  }
}