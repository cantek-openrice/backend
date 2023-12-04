import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as jwtSimple from 'jwt-simple';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';
import { CreateUserDtoExtended } from '../user/dto/create_user.dto';
import { checkPassword, hashPassword } from '../../global/lib/hash';
import { AuthGuard } from '../../global/guards/auth.guard';
import { LoginResponse, RegisterResponse } from './dto/entity/auth.entity';
import { CreateAuthDto } from './dto/create_auth.dto';

@ApiTags('auth')
@Controller('api/auth/user')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body() body: CreateUserDtoExtended,
  ): Promise<RegisterResponse> {
    const users: User[] = await this.userService.getUsers();
    if (users.find((user) => user.username === body.createUserDto.username)) {
      return { message: 'This username is already used' };
    }
    if (users.find((user) => user.email === body.createUserDto.email)) {
      return { message: 'This email is already used' };
    }

    const newUser = (
      await this.userService.createUser(
        {
          ...body.createUserDto,
          password: await hashPassword(body.createUserDto.password),
        },
        body.fileExtension,
      )
    )[0];
    const token = jwtSimple.encode(newUser, process.env.JWT_SECRET as string);
    return {
      user: {
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        profile_picture_url: newUser.profile_picture_url,
      },
      token,
    };
  }

  @Post('login')
  async login(@Body() credentials: CreateAuthDto): Promise<LoginResponse> {
    const users: User[] = await this.userService.getUsers();
    if (
      users.findIndex((user) => user.username === credentials.username) === -1
    ) {
      return { message: 'The username is not found' };
    }

    const user: User = (await this.authService.login(credentials.username))[0];
    const match = await checkPassword(credentials.password, user.password);
    if (match) {
      const token = jwtSimple.encode(user, process.env.JWT_SECRET as string);
      const userFound = {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile_picture_url: user.profile_picture_url,
      };
      return { user: userFound, token };
    } else {
      return { message: 'The password is incorrect' };
    }
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  getCurrentUser(@Request() req) {
    return { user: req.user };
  }
}
