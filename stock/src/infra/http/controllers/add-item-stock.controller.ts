import { Controller, Post, Body, HttpCode, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { z } from 'zod';
import { AddItemStockUseCase } from '@/domain/use-cases/add-item-stock';
import { AddItemStockDto } from './models/dto/add-item-stock.dto';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';

const addItemStockBodySchema = z.object({
  description: z.string(),
  quantity: z.number(),
});

type AddItemStockBodySchema = z.infer<typeof addItemStockBodySchema>;

@ApiTags('Stock')
@Controller('/stock')
export class AddItemStockController {
  constructor(private readonly addItemStock: AddItemStockUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(addItemStockBodySchema))
  @HttpCode(201)
  @ApiOperation({ summary: 'Add an item to stock' })
  @ApiResponse({ status: 201, description: 'Item successfully added to stock.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: AddItemStockDto })
  async handle(@Body() body: AddItemStockBodySchema) {
    const { description, quantity } = body;

    await this.addItemStock.execute({
      description,
      quantity,
    });
  }
}