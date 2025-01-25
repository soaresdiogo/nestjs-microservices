import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ListStockUseCase } from '@/domain/use-cases/list-stock';

@ApiTags('Stock')
@Controller('/stock')
export class ListStockController {
  constructor(private readonly listStock: ListStockUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'List all stock items' })
  @ApiResponse({ status: 200, description: 'List of stock items retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async handle() {
    const result = await this.listStock.execute();

    return result;
  }
}