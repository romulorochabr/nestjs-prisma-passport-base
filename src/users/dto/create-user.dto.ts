import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
    IsStrongPassword,
    IsEnum
  } from 'class-validator';
import { CpfCnpjNotValid } from 'src/validation-rules/cpfcnpj.is.valid';
import { CpfCnpjNotRegistered } from 'src/validation-rules/cpfcnpj.not.registered';
import { EmailNotRegistered } from 'src/validation-rules/email.not.registered';
import { UserRoleAllowed } from 'src/validation-rules/user.role.allowed';
import {Role} from 'src/auth/enums/role.enum';
  
export class CreateUserDto {

  // TODO - Talvez nao precisa de mensagens personalizadas na API? Ou sim?
  // Front end vai traduzir os erros? vai reutiliza-los? senao nao preciso gastar tanto tempo
  // Fazer um test com a API de produtos
  @ApiProperty({ required: true })
  @IsNotEmpty({message: 'Por favor, nome é obrigatório'})
  @IsString({message: 'Por favor, use um nome válido'})
  @MinLength(5, {message: 'Por favor, nome tem que ter mais que 5 caracteres.'})
  @MaxLength(255, {message: 'Por favor, nome tem que ter menos que 255 caracteres.'})
  name:    string;

  @ApiProperty({ required: true })
  @IsNotEmpty({message: 'Por favor, senha é obrigatório'})
  @IsStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1}, {message: 'Por favor, use uma senha com no mínimo 8 caracteres, misturando letra(s) minúsculas, maiúsculas e número(s).'})
  password: string;

  @ApiProperty({ required: true })
  @IsEmail({}, {message: 'Por favor, use um email válido'})
  @IsNotEmpty({message: 'Por favor, email é obrigatório'})
  @EmailNotRegistered({ message: 'Email já registrado. Por favor, escolha um outro ou recupere a sua senha.' })
  email:    string;

  @ApiProperty({ required: true })
  @CpfCnpjNotRegistered({message: 'CPF/CNPJ já registrado. Por favor, escolha um outro ou recupere a sua senha.'})
  @CpfCnpjNotValid({message: 'CPF/CNPJ não é válido.'})
  cpfCnpj:      string;

  @ApiProperty({ required: false })
  @MaxLength(20,{message: 'Celular tem que ter menos que 20 caracteres.'})
  @IsOptional()
  mobile:  string;

  @ApiProperty({ required: false })
  @MaxLength(20,{message: 'Telefone fixo tem que ter menos que 20 caracteres.'})
  @IsOptional()
  landline: string;

  @ApiProperty({
    description: 'Lista de valores permitidos (USER, SUPPLIER)',
    isArray: true,
    enum: Role
  })
  @IsEnum(Role,{message: 'Tipo de usuário é obrigatóro.'})
  @UserRoleAllowed({message: 'Tipo de usuário tem que ser USER ou SUPPLIER.'} )
  role: Role;
}
