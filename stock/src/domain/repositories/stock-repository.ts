import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Stock } from '../enterprise/entities/stock';

export abstract class StockRepository {
  abstract getItem(id: UniqueEntityID): Promise<Stock>;
  abstract listStock(): Promise<Stock[]>;
  abstract addItem(stock: Stock): Promise<void>;
  abstract subtractQuantity({id, quantity}: {id: UniqueEntityID, quantity: number}): Promise<void>;
}