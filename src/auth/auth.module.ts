import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register( {
      secret: 'topSecret',
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([User])],
  providers: [  AuthService  , UsersService , JwtStrategy],
  controllers: [AuthController],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
