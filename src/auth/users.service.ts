import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  /**
     
    **/
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  public async create(userData: CreateUserDto) {
    const user = await this.userRepo.create({
      email: userData.email,
      password: userData.password,
      admin: userData.admin,
    });

    return this.userRepo.save(user);
  }

  public async find(email: string) {
    const users = await this.userRepo.find({ email });

    return users;
  }

  public async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.userRepo.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  public async update() {}

  public async remove() {}
}
