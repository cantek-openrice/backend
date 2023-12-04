import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [AuthService, UserService],
})
export class UserModule {}
