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
import { UpdateUserDto } from './dto/update_user.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { UserEntity } from './dto/entity/user.entity';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }

  @Get(':user_id')
  @ApiParam({ name: 'user_id', required: true, type: String })
  async getUserByID(@Param() params: { user_id: string }): Promise<UserEntity> {
    return (await this.userService.getUserByID(params.user_id))[0];
  }

  @Put(':user_id')
  @ApiParam({ name: 'user_id', required: true, type: String })
  async updateUser(
    @Param() params: { user_id: string },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userFound = await this.userService.getUserByID(params.user_id);
    if (userFound) {
      return (
        await this.userService.updateUser(params.user_id, updateUserDto)
      )[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This user cannot be found',
      });
    }
  }

  @Delete(':user_id')
  @ApiParam({ name: 'user_id', required: true, type: String })
  async deleteUser(@Param() params: { user_id: string }): Promise<UserEntity> {
    const userFound = await this.userService.getUserByID(params.user_id);
    if (userFound) {
      return (await this.userService.deleteUser(params.user_id))[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This user cannot be found',
      });
    }
  }
}
