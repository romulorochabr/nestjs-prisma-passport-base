import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty
  } from 'class-validator';
  
export class SignInDto {

  @ApiProperty({ required: true })
  @IsNotEmpty({message: 'Por favor, usuário é obrigatório'})
  username:    string;

  @ApiProperty({ required: true })
  @IsNotEmpty({message: 'Por favor, senha é obrigatório'})
  password: string;

}
