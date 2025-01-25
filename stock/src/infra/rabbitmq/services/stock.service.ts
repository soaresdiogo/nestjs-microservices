import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { StockRepository } from '@/domain/repositories/stock-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  public async subtractQuantity({
    id,
    quantity,
  }: {
    id: UniqueEntityID;
    quantity: number;
  }): Promise<void> {
    await this.stockRepository.subtractQuantity({ id, quantity });
  }
}