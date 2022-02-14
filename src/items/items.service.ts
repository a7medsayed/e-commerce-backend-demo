import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dtos/create.item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  /**
   *
   */
  constructor(
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
  ) {}

  //create item
  public async create(itemData: CreateItemDto) {
    const item = await this.itemRepo.create({
      name: itemData.name,
      price: itemData.price,
      count: itemData.count,
      isActive: itemData.isActive,
    });

    return this.itemRepo.save(item);
  }

  //find all items
  public async findAll(limit: number = 20, page: number = 1) {
    const items = await this.itemRepo
      .createQueryBuilder('items')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return items;
  }

  //find active items
  public async findActive(limit: number = 20, page: number = 1) {
    const items = await this.itemRepo
      .createQueryBuilder('items')
      .where('items.isActive = true')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return items;
  }

  //find by Id
  public async findOne(id: number) {
    if (!id) {
      return null;
    }
    const item = await this.itemRepo.findOne(id);
    if(!item)
    {
        throw new NotFoundException('item not found');
    }
    return item;
  }
}
