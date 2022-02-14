import { User } from 'src/auth/user.entity';
import { Order } from 'src/orders/order.entity';
import {Entity , Column , PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from 'typeorm'

@Entity()
export class Item
{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    count: number;
    
    @Column({default: true})
    isActive: boolean;

    @ManyToOne(()=> User  , (user)=>user.items)
    public user: User;


    @ManyToMany(() => Order)
    @JoinTable()
    orders: Order[];

}