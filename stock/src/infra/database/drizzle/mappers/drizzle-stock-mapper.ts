import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Stock } from '@/domain/enterprise/entities/stock';

export class DrizzleStockMapper {
  static toDomain(record: any): Stock {
    return Stock.create(
      {
        description: record.description,
        quantity: record.quantity,
        createdAt: record.createdAt,
      },
      new UniqueEntityID(record.id),
    );
  }

  static toDatabase(stock: Stock) {
    console.log(stock);
    return {
      id: stock.id.toValue(),
      description: stock.description,
      quantity: stock.quantity,
      created_at: stock.createdAt,
    };
  }
}