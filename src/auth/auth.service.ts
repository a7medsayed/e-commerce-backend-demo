import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(private usersService: UsersService) {}

  async signup(userData: CreateUserDto) {
    const users = await this.usersService.find(userData.email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(userData.password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    userData.password = result;
    const user = await this.usersService.create(userData);

    return user;
  }

  async signin(userData: CreateUserDto) {
    const [user] = await this.usersService.find(userData.email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHashedPassword] = user.password.split('.');
    const hash = (await scrypt(userData.password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHashedPassword) {
      throw new BadRequestException('password incorrect');
    }

    return user;
  }
}
