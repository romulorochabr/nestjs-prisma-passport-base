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
    // TODO - Create Decorator to verify if email already exists
    @EmailNotRegistered({ message: 'Email já registrado. Por favor, escolha um outro ou recupere a sua senha.' })
    email:    string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    @ApiProperty({ required: false, nullable: true })
    // TODO - Create Decorator to verify if CPF already exists and It is valid
    cpf:      string  | null;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @ApiProperty({ required: false, nullable: true })
    // TODO - Create Decorator to verify if CPF already exists and It is valid
    cnpj:     string  | null;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @ApiProperty({ required: false })
    celular:  string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    @ApiProperty({ required: false })
    tel_fixo: string;
}
