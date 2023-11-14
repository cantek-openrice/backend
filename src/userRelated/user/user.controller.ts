import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserByID(@Param() params: { id: string }) {
    return (await this.userService.getUserByID(params.id))[0];
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return (await this.userService.createUser(createUserDto))[0];
  }

  @Put(':id')
  async updateUser(
    @Param() params: { id: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userFound = await this.userService.getUserByID(params.id);
    if (userFound) {
      return (await this.userService.updateUser(params.id, updateUserDto))[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This user cannot be found',
      });
    }
  }

  @Delete(':id')
  async deleteUser(@Param() params: { id: string }) {
    const userFound = await this.userService.getUserByID(params.id);
    if (userFound) {
      return (await this.userService.deleteUser(params.id))[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This user cannot be found',
      });
    }
  }
}
