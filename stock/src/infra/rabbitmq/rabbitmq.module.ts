import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { env } from 'src/infra/env/env';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'order',
          type: 'direct',
        },
        {
          name: 'stock',
          type: 'direct',
        },
      ],
      uri: `${env.RABBITMQ_URL}`,
      enableControllerDiscovery: true,
      connectionInitOptions: {
        wait: true,
        timeout: 15000
      },
      queues: [
        {
          name: 'stock-queue',
          exchange: 'order',
          routingKey: 'stock'
        }
      ]
    }),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService, RabbitMQModule],
})
export class RabbitmqModule {}