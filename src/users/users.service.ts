import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { sanitizeCpfCnpj } from 'src/utils/cpf.cnpj.sanitize.function';

@Injectable()
export class UsersService {


  constructor(private prisma: PrismaService) {}
  
  // TODO - Verify if async will work or not
  async signUp(createUserDto: CreateUserDto) {

    const saltOrRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    // Clean CpfCNPJ
    createUserDto.cpfCnpj = sanitizeCpfCnpj(createUserDto?.cpfCnpj);

    const user = await this.prisma.user.create({ data: createUserDto });
    return `New user ${user.id} - ${user.name} created successfully`;
  }

  // TODO - Remove password information
  findAll() {
    return this.prisma.user.findMany();
  }

  // TODO - Remove password information
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
    this.prisma.user.delete({ where: {id} })
  }
}
