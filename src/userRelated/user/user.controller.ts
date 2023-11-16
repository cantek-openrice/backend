import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './dto/entity/user.entity';

@ApiTags('User')
@Controller('api/user')
@ApiExcludeController()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserByID(@Param() params: { id: string }): Promise<UserEntity> {
    return (await this.userService.getUserByID(params.id))[0];
  }

  @Put(':id')
  async updateUser(
    @Param() params: { id: string },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
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
  async deleteUser(@Param() params: { id: string }): Promise<UserEntity> {
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
