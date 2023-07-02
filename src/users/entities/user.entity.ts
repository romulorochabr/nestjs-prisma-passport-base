import { Role } from "src/auth/enums/role.enum";
import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    emailVerified: boolean;
    @ApiProperty()
    cpfCnpj: string;
    @ApiProperty()
    mobile: string;
    @ApiProperty()
    landline: string;
    @ApiProperty()
    role: Role;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
