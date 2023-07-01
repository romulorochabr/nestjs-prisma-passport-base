import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
import { Role } from 'src/auth/enums/role.enum';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
// import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {


  constructor(private prisma: PrismaService) {}
  
  // constructor(private prisma: PrismaService) {}
  
  // private readonly users: User[] = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //     roles: [Role.Supplier]
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //     roles: [Role.User]
  //   },
  //   {
  //     userId: 3,
  //     username: 'romulo',
  //     password: 'admin',
  //     roles: [Role.Admin]
  //   }
  // ];

  create(newUser: CreateUserDto) {
    return 'This action adds a new user';
  }

  signUp(newUser: User) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // TODO - Change it to correct method
  findByUsername(userEmail: string) {
    // const user = this.prisma.user.findUnique({
    //   where: {
    //     email : userEmail
    //   },
    // })
    // return user;
    return `This action returns a #${userEmail} user`;
  }

  findByEmail(userEmail: string) {
    const user = this.prisma.user.findUnique({
      where: {
        email : userEmail
      },
    })
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
