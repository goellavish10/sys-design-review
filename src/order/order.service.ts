import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

const orders: Order[] = [
  {
    id: 1,
    userId: 1,
    productId: 4
  },
  {
    id: 2,
    userId: 2,
    productId: 1
  },
  {
    id: 3,
    userId: 3,
    productId: 2
  },
  {
    id: 4,
    userId: 3,
    productId: 3
  }
]

@Injectable()
export class OrderService {
  private orders: Order[] = orders;
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  findOrderByProductAndUserId(productId: number, userId: number) {
    return this.orders.find(order => order.productId === productId && order.userId === userId);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
