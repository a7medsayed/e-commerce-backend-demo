import { User } from 'src/auth/user.entity';
import { Item } from 'src/items/item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column({ default: 0 })
  totalPrice: number;

  @Column({ default: 'new' })
  status: string;

  @ManyToMany(() => Item, (item) => item.orders)
  @JoinTable()
  items: Item[];
}
