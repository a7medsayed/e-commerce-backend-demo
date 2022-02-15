import { Test, TestingModule } from '@nestjs/testing';
import { CreateItemDto } from './dtos/create.item.dto';
import { Item } from './item.entity';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let fackItemsService: Partial<ItemsService>;

  beforeEach(async () => {
    var items: Item[] = [];
    fackItemsService = {
      findAll: () => {
        return Promise.resolve(items);
      },
      findActive: () => {
        const filteredUsers = items.filter((item) => item.isActive == true);
        return Promise.resolve(filteredUsers);
      },
      findOne: (id: number) => {
        const filteredUsers = items.filter((item) => item.id == id);
        return Promise.resolve(filteredUsers[0]);
      },
      create: (createItemDto: CreateItemDto) => {
        const item = {
          id: Math.floor(Math.random() * 9999),

          name: createItemDto.name,
          price: createItemDto.price,
          count: createItemDto.count,
          isActive: createItemDto.isActive,
        } as Item;

        items.push(item);
        return Promise.resolve(item);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ItemsService,
          useValue: fackItemsService,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('create Item successfuly', async () => {
    let createuserDto = {
      name: 'product1',
      price: 10,
      count: 100,
      isActive: true,
    };
    const item = await fackItemsService.create(createuserDto);

    expect(item).toBeDefined();
  });

  it('find all created items', async () => {
    let createuserDto = {
      name: 'product1',
      price: 10,
      count: 100,
      isActive: true,
    };
    await fackItemsService.create(createuserDto);
    await fackItemsService.create(createuserDto);
    await fackItemsService.create(createuserDto);

    const items = await fackItemsService.findAll();
    expect(items.length).toBe(3);
  });

  it('find active items', async () => {
    let createuserDto = {
      name: 'Active product',
      price: 10,
      count: 100,
      isActive: true,
    };
    await fackItemsService.create(createuserDto);

    const items = await fackItemsService.findActive();
    expect(items[0].isActive).toBeTruthy();
    expect(items[0].name).toBe('Active product');
  });
});
