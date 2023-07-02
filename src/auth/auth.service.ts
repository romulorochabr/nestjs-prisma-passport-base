import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  // TODO - Improve to allow login using CPF, CNPJ or email
  // TODO - Improve to use a bigger secrect/JWT
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const isPasswordMatch = await bcrypt.compare(pass, user?.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name, roles: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
