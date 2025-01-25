import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { z } from 'zod';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { StockService } from '@/infra/rabbitmq/services/stock.service';
import { SubtractQuantityDto } from './models/dto/subtract-quantity-dto';

const subtractQuantitySchema = z.object({
  id: z.string(),
  quantity: z.number().min(1),
});

type SubtractQuantitySchema = z.infer<typeof subtractQuantitySchema>;

@ApiTags('RabbitMQ')
@Controller()
export class SubtractQuantityController {
  constructor(private readonly stockService: StockService) {}

  @RabbitSubscribe({
    exchange: 'order',
    routingKey: 'stock',
    queue: 'stock-queue',
  })
  @ApiOperation({ summary: 'Subscribe to RabbitMQ messages for stock quantity subtraction' })
  @ApiBody({
    description: 'Payload of the RabbitMQ message',
    type: SubtractQuantityDto,
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