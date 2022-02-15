import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin-guard';
import { User } from 'src/shared/decorators/user.decorator';
import { CreateOrderDto } from './dtos/create.order.dto';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  createItem(@Body() createOrderDto: CreateOrderDto, @User() user) {
    return this.ordersService.create(createOrderDto, user);
  }

  @Get('/')
  @UseGuards(AuthGuard())
  getUserOrders(@User() user, @Query('limit') limit, @Query('page') page) {
    return this.ordersService.userOrders(user, parseInt(limit), parseInt(page));
  }

  @UseGuards(AuthGuard(), AdminGuard)
  @Get('/all')
  listAll(@User() user, @Query('limit') limit, @Query('page') page) {
    return this.ordersService.listAll(user, parseInt(limit), parseInt(page));
  }

  @Post('cancel/:id')
  @UseGuards(AuthGuard())
  cancelOrder(@Param('id') id, @User() user) {
    return this.ordersService.cancel(parseInt(id), user);
  }

  @Post('complete/:id')
  @UseGuards(AuthGuard())
  completeOrder(@Param('id') id, @User() user) {
    return this.ordersService.complete(parseInt(id), user);
  }
}
