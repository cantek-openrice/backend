import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
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

  @Get('id/:user_id')
  @ApiParam({ name: 'user_id', required: true, type: String })
  async getUserByID(@Param() params: { user_id: string }): Promise<UserEntity> {
    return (await this.userService.getUserByID(params.user_id))[0];
  }

  @Put('id/:user_id')
  @ApiParam({ name: 'user_id', required: true, type: String })
  async updateUser(
    @Param() params: { user_id: string },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | { message: string }> {
    const userFound = await this.userService.getUserByID(params.user_id);
    if (userFound) {
      return (
        await this.userService.updateUser(params.user_id, updateUserDto)
      )[0];
    } else {
      return { message: 'This user cannot be found' };
    }
  }

  @Delete('id/:user_id')
  @ApiParam({ name: 'user_id', required: true, type: String })
  async deleteUser(
    @Param() params: { user_id: string },
  ): Promise<UserEntity | { message: string }> {
    const userFound = await this.userService.getUserByID(params.user_id);
    if (userFound) {
      return (await this.userService.deleteUser(params.user_id))[0];
    } else {
      return { message: 'This user cannot be found' };
    }
  }
}
