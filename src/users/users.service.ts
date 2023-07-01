import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {


  constructor(private prisma: PrismaService) {}
  
  signUp(createUserDto: CreateUserDto) {
    return `will create a new user`;
    // return this.prisma.user.create({ data: createUserDto});
    // return this.prisma.user.create({
    //   createUserDto,
    // });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
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
