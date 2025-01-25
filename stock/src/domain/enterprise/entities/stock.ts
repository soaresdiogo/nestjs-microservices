import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface StockProps {
  description: string;
  quantity: number;
  createdAt: Date;
}

export class Stock extends Entity<StockProps> {
  get description() {
    return this.props.description;
  }

  get quantity() {
    return this.props.quantity;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: StockProps, id?: UniqueEntityID) {
    const stock = new Stock(props, id);

    return stock;
  }
}