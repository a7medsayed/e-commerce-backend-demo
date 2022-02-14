import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from 'src/items/items.service';
import { Item } from 'src/items/item.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([Order, Item]),
  ],
  providers: [OrdersService, ItemsService],
  controllers: [OrdersController],
})
export class OrdersModule {}
