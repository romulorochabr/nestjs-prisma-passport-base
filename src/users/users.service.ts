import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UsersService {
  
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: [Role.Supplier]
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: [Role.Client]
    },
    {
      userId: 3,
      username: 'romulo',
      password: 'admin',
      roles: [Role.Admin]
    }
  ];

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByUsername(username: string) {
    return this.users.find(user => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
