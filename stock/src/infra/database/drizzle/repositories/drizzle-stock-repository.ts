import { StockRepository } from '@/domain/repositories/stock-repository';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../drizzle-service';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Stock } from '@/domain/enterprise/entities/stock';
import { stock as stockTable } from '../configs/schema';
import { DrizzleStockMapper } from '../mappers/drizzle-stock-mapper';
import { RedisService } from '../../redis/redis-service';

@Injectable()
export class DrizzleStockRepository implements StockRepository {
  constructor(private readonly drizzleService: DrizzleService, private readonly redisService: RedisService,) {}


  async getItem(id: UniqueEntityID): Promise<Stock | null> {
    const { db } = this.drizzleService;

    const result = await db
      .select()
      .from(stockTable)
      .where(eq(stockTable.id, id.toValue()))
      .limit(1);

    if (!result[0]) {
      return null;
    }

    return DrizzleStockMapper.toDomain(result[0]);
  }

  async listStock(): Promise<Stock[]> {
    const cacheKey = 'stock:list';

    const cachedStocks = await this.redisService.get<Stock[]>(cacheKey);
    if (cachedStocks) {
      return cachedStocks;
    }

    const { db } = this.drizzleService;
    const results = await db.select().from(stockTable);

    const stocks = results.map(DrizzleStockMapper.toDomain);

    await this.redisService.set(cacheKey, stocks, 3600);

    return stocks;
  }

  async addItem(stock: Stock): Promise<void> {
    const { db } = this.drizzleService;

    await db.insert(stockTable).values(DrizzleStockMapper.toDatabase(stock));

    await this.redisService.del('stock:list');
  }

  async subtractQuantity({
    id,
    quantity,
  }: {
    id: UniqueEntityID;
    quantity: number;
  }): Promise<void> {
    const { db } = this.drizzleService;

    const stockItem = await this.getItem(id);

    if (!stockItem) {
      throw new Error('Item not found');
    }

    if (stockItem.quantity < quantity) {
      throw new Error('Insufficient stock quantity');
    }

    await db
      .update(stockTable)
      .set({ quantity: stockItem.quantity - quantity })
      .where(eq(stockTable.id, id.toValue()));
  }
}