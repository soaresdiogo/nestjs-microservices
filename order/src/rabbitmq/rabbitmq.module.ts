import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqService } from './rabbitmq.service';
import { env } from '../env';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMQModule.forRoot({
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
      enableControllerDiscovery: false,
      connectionInitOptions: {
        wait: true,
        timeout: 15000
      },
    }),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService, RabbitMQModule],
})
export class RabbitmqModule {}