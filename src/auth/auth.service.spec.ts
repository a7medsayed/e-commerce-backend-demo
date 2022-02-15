import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  let createuserDto = { email: 'ahmed@gmail.com', password: '123' };

  beforeEach(async () => {
    var users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email == email);
        return Promise.resolve(filteredUsers);
      },
      create: (createUserDto: CreateUserDto) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email: createUserDto.email,
          password: createUserDto.password,
        } as User;

        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('create instance of authservice ', async () => {
    expect(service).toBeDefined();
  });

  it('ensure that password is hashed', async () => {
    const createuserDto = { email: 'ahmed@gmail.com', password: '123' };
    const user = await service.signup(createuserDto);

    expect(user.password).not.toEqual('123');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throw an error email in use when user signup with used email', (done) => {
    service.signup(createuserDto).then(() => {
      service.signup(createuserDto).catch((err) => done());
    });
  });

  it('throw an error while signin with unused email', (done) => {
    service.signin(createuserDto).catch((err) => done());
  });

  it('return user if password is correct', async () => {
    createuserDto = { email: 'ahmed@gmail.com', password: '123' };
    await service.signup(createuserDto);
    createuserDto = { email: 'ahmed@gmail.com', password: '123' };
    const user = await service.signin(createuserDto);
    expect(user).toBeDefined();
  });
});
