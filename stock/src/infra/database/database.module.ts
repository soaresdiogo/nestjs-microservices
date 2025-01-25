import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle-service';
import { StockRepository } from '@/domain/repositories/stock-repository';
import { DrizzleStockRepository } from './drizzle/repositories/drizzle-stock-repository';
import { RedisService } from './redis/redis-service';

@Module({
  providers: [
    DrizzleService,
    RedisService,
    { provide: StockRepository, useClass: DrizzleStockRepository },
  ],
  exports: [DrizzleService, StockRepository, RedisService],
})
export class DatabaseModule {}