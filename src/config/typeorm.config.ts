import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from 'src/auth/user.entity'
import { Item } from 'src/items/item.entity'
import { Order } from 'src/orders/order.entity'
export const typeOrmConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'onmarket',
    entities: [ User , Item , Order],
    synchronize: true,
    
}