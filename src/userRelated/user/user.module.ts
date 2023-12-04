import { Module } from '@nestjs/common';
import { KnexModule } from '../../global/modules/knex.module';
import { AuthService } from '../auth/auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [KnexModule],
  controllers: [UserController],
  providers: [AuthService, UserService],
})
export class UserModule {}
