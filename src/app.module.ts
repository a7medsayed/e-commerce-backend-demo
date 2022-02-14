import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfigDev } from './config/typeorm.config';
import { typeOrmConfigProd } from './config/typeorm.config';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [
    TypeOrmModule.forRoot((process.env.NODE_ENV == 'development'? typeOrmConfigDev : typeOrmConfigProd)),
    AuthModule, ItemsModule, OrdersModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
