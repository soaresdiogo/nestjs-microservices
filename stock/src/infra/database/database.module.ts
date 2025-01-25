import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle/DrizzleService';
import { StockRepository } from '@/domain/repositories/stock-repository';
import { DrizzleStockRepository } from './drizzle/repositories/drizzle-stock-repository';

@Module({
  providers: [
    DrizzleService,
    { provide: StockRepository, useClass: DrizzleStockRepository },
  ],
  exports: [DrizzleService, StockRepository],
})
export class DatabaseModule {}