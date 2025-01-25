import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '../../core/entities/unique-entity-id';
import { StockRepository } from '../repositories/stock-repository';

interface GetItemStockUseCaseRequest {
  id: UniqueEntityID;
}

@Injectable()
export class GetItemStockUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async execute({id}: GetItemStockUseCaseRequest) {
    const itemStock = await this.stockRepository.getItem(id);

    if(!itemStock) return 'Item not found';

    return {
      item: itemStock,
    };
  }
}