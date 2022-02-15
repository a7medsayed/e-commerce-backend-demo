import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/shared/decorators/user.decorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController 
{
     /**
   *
   */
  constructor(
    private authServices: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authServices.signup(body);
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    const user = await this.authServices.signin(body);

    const payload = { email: user.email};
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
