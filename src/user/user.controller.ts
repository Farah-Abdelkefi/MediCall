import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserService } from './user.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  userrService: any;
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserrDto: UserSubscribeDto) {
    return this.userService.create(createUserrDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Post('/subscribe')
  register(@Body() userData: UserSubscribeDto) {
    return this.userService.register(userData);
  }
  @Post('/login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }
  @Get('/:id')
  FindById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.softDelete(id);
  }

  @Patch('/restore/:id')
  restore(@Param('id') id: string) {
    return this.userService.restore(id);
  }
}
