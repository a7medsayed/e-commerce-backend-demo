import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ItemsService } from 'src/items/items.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create.order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  /**
   *
   */
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private itemsService: ItemsService,
  ) {}

  //create new Order
  async create(createOrderDto: CreateOrderDto, user: User) {
    var items = [];
    if (createOrderDto.itemIds.length > 0) {
      for (const itemId of createOrderDto.itemIds) {
        const item = await this.itemsService.findOne(itemId);
        items.push(item);
      }
    }
    const order = await this.orderRepository.create({
      totalPrice: createOrderDto.totalPrice,
    });
    order.user = user;
    order.items = items;
    return this.orderRepository.save(order);
  }

  //add items to order
  async addItems(createOrderDto: CreateOrderDto, orderId: number) {
    var items = [];
    if (createOrderDto.itemIds.length > 0) {
      for (const itemId of createOrderDto.itemIds) {
        const item = await this.itemsService.findOne(itemId);
        items.push(item);
      }
    }
    const order = await this.orderRepository.findOne(orderId);

    if (!order) {
      throw new NotFoundException('order not found');
    }
    order.items.push(...items);
    return this.orderRepository.save(order);
  }

  //complete order
  async complete(orderId: number, { id }) {
    const order = await this.orderRepository.findOne(orderId);

    if (!order || order.user.id != id) {
      throw new NotFoundException('order not found');
    }

    order.status = 'completed';
    return this.orderRepository.save(order);
  }

  //cancel order
  async cancel(orderId: number, { id }) {
    const order = await this.orderRepository.findOne(orderId);

    if (!order || order.user.id != id) {
      throw new NotFoundException('order not found');
    }
    order.status = 'canceled';
    return this.orderRepository.save(order);
  }

  //list all orders only admin
  async listAll(user, limit: number, page: number) {
    //check if user is admin
    if (!user.admin) {
      throw new ForbiddenException('this feature for admin users');
    }

    const orders = await this.orderRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.items', 'items')
      .leftJoinAndSelect('orders.user', 'user')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return orders;
  }

  //get user orders
  async userOrders({ id }, limit: number, page: number) {
    const orders = await this.orderRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.items', 'items')
      .leftJoinAndSelect('orders.user', 'user')
      .where('user.id = :id', { id: id })
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return orders;
  }
}
