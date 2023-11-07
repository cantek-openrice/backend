import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param() id: string) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param() id: string, @Body() updateUserDto: UpdateUserDto) {
    const userFound = await this.userService.getUserById(id);
    if (userFound) {
      return this.userService.updateUser(id, updateUserDto);
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This user cannot be found',
      });
    }
  }

  @Delete('id')
  async deleteUser(@Param() id: string) {
    const userFound = await this.userService.getUserById(id);
    if (userFound) {
      return await this.userService.deleteUser(id);
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This user cannot be found',
      });
    }
  }
}
