import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { sanitizeCpfCnpj } from '../utils/cpfcnpj.clean.function';

@Injectable()
export class UsersService {


  constructor(private prisma: PrismaService) {}
  
  async signUp(createUserDto: CreateUserDto) {

    const saltOrRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    // Clean CpfCNPJ
    createUserDto.cpfCnpj = sanitizeCpfCnpj(createUserDto?.cpfCnpj);

    const user = await this.prisma.user.create({ data: createUserDto });
    return `New user ${user.id} - ${user.name} created successfully`;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // TODO - Change it to correct method (Find by CNPJ, CPF or Email?)
  findByUsername(userEmail: string) {
    const user = this.prisma.user.findUnique({
      where: {
        email : userEmail
      }
    });
    return user;
  }

  findByEmail(userEmail: string) {
    const user = this.prisma.user.findUnique({
      where: {
        email : userEmail
      },
    })
    return user;
  }

  findByCpfCnpj(cpfCnpj: string) {
    const user = this.prisma.user.findFirst({
      where: { cpfCnpj },
    })
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: {id} })
  }
}
