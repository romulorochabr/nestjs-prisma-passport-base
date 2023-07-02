import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { IsEmailNotRegistered } from './validation-rules/email.not.registered';
import { IsCpfCnpjNotRegistered } from './validation-rules/cpfcnpj.not.registered';
import { IsCpfCnpjNotValid } from './validation-rules/cpfcnpj.is.valid';

// TODO - Create a module for validation rules and
@Module({
  imports: [UsersModule, ProductsModule, PostsModule, AuthModule, PrismaModule],
  providers: [PrismaService, IsEmailNotRegistered, IsCpfCnpjNotRegistered, IsCpfCnpjNotValid]
})
export class AppModule {}
