import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { GetItemStockUseCase } from '@/domain/use-cases/get-item-stock';

@ApiTags('Stock')
@Controller('/stock')
export class GetItemStockController {
  constructor(private readonly itemStock: GetItemStockUseCase) {}

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a stock item by ID' })
  @ApiResponse({ status: 200, description: 'Stock item retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Stock item not found.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the stock item.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  async handle(@Param('id') id: string) {
    const uniqueId = new UniqueEntityID(id);
    const result = await this.itemStock.execute({ id: uniqueId });

    return result;
  }
}