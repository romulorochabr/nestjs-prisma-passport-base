import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
    IsStrongPassword
  } from 'class-validator';
import { CpfCnpjNotValid } from 'src/validation-rules/cpfcnpj.is.valid';
import { CpfCnpjNotRegistered } from 'src/validation-rules/cpfcnpj.not.registered';
import { EmailNotRegistered } from 'src/validation-rules/email.not.registered';
  
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @ApiProperty({ required: true })
    name:    string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1})
    @ApiProperty({ required: true })
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    @EmailNotRegistered({ message: 'Email já registrado. Por favor, escolha um outro ou recupere a sua senha.' })
    email:    string;

    @CpfCnpjNotRegistered({message: 'CPF/CNPJ já registrado. Por favor, escolha um outro ou recupere a sua senha.'})
    @CpfCnpjNotValid({message: 'CPF/CNPJ não é válido.'})
    @ApiProperty({ required: true })
    cpfCnpj:      string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @ApiProperty({ required: false })
    mobile:  string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @ApiProperty({ required: false })
    landline: string;
}
