import { Controller, Get, HttpCode, Param } from '@nestjs/common';

import { ListStockUseCase } from '@/domain/use-cases/list-stock';
import { GetItemStockUseCase } from '@/domain/use-cases/get-item-stock';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';


@Controller('/stock')
export class GetItemStockController {
  constructor(private readonly itemStock: GetItemStockUseCase) {}

  @Get(':id')
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    const uniqueId = new UniqueEntityID(id); 
    const result = await this.itemStock.execute({id: uniqueId});

    return result;
  }
}