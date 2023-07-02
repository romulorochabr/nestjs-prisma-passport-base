import { Request, Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Logger, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(UsersController.name);

  @ApiCreatedResponse({ type: UserEntity })
  @Public()
  @Post("signUp")
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @ApiCreatedResponse({ type: UserEntity })
  @Roles(Role.Admin, Role.Supplier, Role.User)
  @Get("me")
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }


  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiCreatedResponse({ type: UserEntity })
  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Searching User id (${id})`);
    const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new NotFoundException(`User with ${id} does not exist.`);
      }
      return user;
  }

  // TODO - Allow Users and Suppliers to update only their data
  @ApiCreatedResponse({ type: UserEntity })
  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiCreatedResponse({ type: UserEntity })
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
