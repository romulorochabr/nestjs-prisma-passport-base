import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({ required: true })
    name:    string;

    @ApiProperty({ required: true })
    password: string;

    @ApiProperty({ required: true })
    email:    string;

    @ApiProperty({ required: false, nullable: true })
    cpf:      string  | null;

    @ApiProperty({ required: false, nullable: true })
    cnpj:     string  | null;

    @ApiProperty({ required: false })
    celular:  string;

    @ApiProperty({ required: false })
    tel_fixo: string;
}
