import { StockRepository } from '../repositories/stock-repository';
import { UniqueEntityID } from '../../core/entities/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { Stock } from '../enterprise/entities/stock';

interface AddItemStockUseCaseRequest {
  id?: UniqueEntityID;
  description: string;
  quantity: number;
}

@Injectable()
export class AddItemStockUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async execute({description, quantity}: AddItemStockUseCaseRequest) {
    const newItemStock = Stock.create({
      description,
      quantity,
      createdAt: new Date(),
    });

    await this.stockRepository.addItem(newItemStock);

    return {
      itemStock: newItemStock,
    };
  }
}