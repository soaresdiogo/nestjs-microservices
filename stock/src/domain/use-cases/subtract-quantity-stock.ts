import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { StockRepository } from '../repositories/stock-repository';

interface SubtractQuantityUseCaseRequest {
  id: UniqueEntityID;
  quantity: number;
}

@Injectable()
export class SubtractQuantityUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async execute({ id, quantity }: SubtractQuantityUseCaseRequest): Promise<string> {
    const itemStock = await this.stockRepository.getItem(id);

    if (!itemStock) {
      return 'Item not found';
    }

    if (itemStock.quantity < quantity) {
      return 'Insufficient stock quantity';
    }

    await this.stockRepository.subtractQuantity({ id, quantity });

    return 'Quantity successfully subtracted';
  }
}