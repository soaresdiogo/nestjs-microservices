import { Controller, Get, HttpCode } from '@nestjs/common';

import { ListStockUseCase } from '@/domain/use-cases/list-stock';


@Controller('/stock')
export class ListStockController {
  constructor(private readonly listStock: ListStockUseCase) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const result = await this.listStock.execute();

    return result;
  }
}