import { Exclude } from 'class-transformer';
import { Item } from 'src/items/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Item, (item) => item.user)
  public items: Item[];
}
