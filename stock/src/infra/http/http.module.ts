import { AddItemStockUseCase } from '@/domain/use-cases/add-item-stock';
import { GetItemStockUseCase } from '@/domain/use-cases/get-item-stock';
import { ListStockUseCase } from '@/domain/use-cases/list-stock';
import { SubtractQuantityUseCase } from '@/domain/use-cases/subtract-quantity-stock';
import { Module } from '@nestjs/common';
import { SubtractQuantityController } from './controllers/subtract-quantity.controller';
import { DatabaseModule } from '../database/database.module';
import { ListStockController } from './controllers/list-stock.controller';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { StockService } from '../rabbitmq/services/stock.service';
import { AddItemStockController } from './controllers/add-item-stock.controller';
import { GetItemStockController } from './controllers/get-item-stock.controller';

@Module({
  imports: [DatabaseModule, RabbitmqModule],
  controllers: [SubtractQuantityController, ListStockController, AddItemStockController, GetItemStockController],
  providers: [StockService, AddItemStockUseCase, GetItemStockUseCase, ListStockUseCase, SubtractQuantityUseCase],
})
export class HttpModule {}