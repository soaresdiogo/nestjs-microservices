import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { envSchema } from './infra/env/env';
import { RabbitmqModule } from './infra/rabbitmq/rabbitmq.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true,
  }), RabbitmqModule, HttpModule],
})
export class AppModule {}