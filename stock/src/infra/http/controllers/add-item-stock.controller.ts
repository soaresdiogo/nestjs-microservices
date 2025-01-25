import { AddItemStockUseCase } from '@/domain/use-cases/add-item-stock';
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';

import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';

const addItemStockBodySchema = z.object({
  description: z.string(),
  quantity: z.number(),
});

type AddItemStockBodySchema = z.infer<typeof addItemStockBodySchema>;

@Controller('/stock')
export class AddItemStockController {
  constructor(private readonly addItemStock: AddItemStockUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(addItemStockBodySchema))
  @HttpCode(201)
  async handle(@Body() body: AddItemStockBodySchema) {
    const { description, quantity } = body;

    await this.addItemStock.execute({
      description,
      quantity,
    });
  }
}