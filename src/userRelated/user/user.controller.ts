import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import * as jwtSimple from 'jwt-simple';

import { UserService } from './user.service';
import { AuthGuard } from '../../global/guards/auth.guard';
import { User } from './interfaces/user.interface';
import { UpdateUserDtoExtended } from './dto/update_user.dto';
import {
  UpdateUserProfileResponse,
  UserEntity,
} from './dto/entity/user.entity';

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

  @Put('profile/:user_id')
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'user_id', required: true, type: String })
  async updateUserProfile(
    @Param() params: { user_id: string },
    @Body() body: UpdateUserDtoExtended,
    @Request() req,
  ): Promise<UpdateUserProfileResponse> {
    const userFound = await this.userService.getUserByID(params.user_id);
    if (userFound) {
      const users: User[] = await this.userService.getUsers();
      if (
        users.find((user) => user.username === body.updateUserDto.username) &&
        req.user.username !== body.updateUserDto.username
      ) {
        return {
          message:
            'The username cannot be updated because this username is already used',
        };
      }
      if (
        users.find((user) => user.email === body.updateUserDto.email) &&
        req.user.email !== body.updateUserDto.email
      ) {
        return {
          message:
            'The email cannot be updated because this email is already used',
        };
      }

      const user = (
        await this.userService.updateUserProfile(
          params.user_id,
          body.updateUserDto,
          body.fileExtension,
        )
      )[0];
      const token = jwtSimple.encode(user, process.env.JWT_SECRET as string);

      return {
        userInfo: {
          user_id: user.user_id,
          email: user.email,
          username: user.username,
          role: user.role,
          profile_picture_url: user.profile_picture_url,
        },
        token,
      };
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
