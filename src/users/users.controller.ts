import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { isEmpty } from 'class-validator';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(UsersController.name);

  @Public()
  @Post("signUp")
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Roles(Role.Admin, Role.Supplier, Role.User)
  @Get("myProfile")
  myProfile() {
    return `returns users data based on JWT`
  }
  

  // TODO - Return status errors like 404 
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // TODO - Return status errors like 404 
  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Searching User id (${id})`);
    const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new NotFoundException(`User with ${id} does not exist.`);
      }
      return user;
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
