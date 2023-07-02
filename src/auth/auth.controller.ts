import { AuthService } from './auth.service';
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post
  } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ description: " returns the json: {access_token: value}" })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}