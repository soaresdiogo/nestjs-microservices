import { StockRepository } from '@/domain/repositories/stock-repository';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../DrizzleService';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Stock } from '@/domain/enterprise/entities/stock';
import { stock as stockTable } from '../configs/schema';
import { DrizzleStockMapper } from '../mappers/drizzle-stock-mapper';

@Injectable()
export class DrizzleStockRepository implements StockRepository {
  constructor(private readonly drizzleService: DrizzleService) {}


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
    const { db } = this.drizzleService;

    const results = await db.select().from(stockTable);

    return results.map(DrizzleStockMapper.toDomain);
  }

  async addItem(stock: Stock): Promise<void> {
    const { db } = this.drizzleService;

    await db.insert(stockTable).values(DrizzleStockMapper.toDatabase(stock));
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