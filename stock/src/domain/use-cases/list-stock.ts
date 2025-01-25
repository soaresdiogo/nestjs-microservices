import { Injectable } from '@nestjs/common';
import { StockRepository } from '../repositories/stock-repository';

@Injectable()
export class ListStockUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async execute() {
    return await this.stockRepository.listStock();
  }
}