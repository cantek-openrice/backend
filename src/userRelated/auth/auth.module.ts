import { Module } from '@nestjs/common';
import { KnexModule } from '../../global/modules/knex.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [KnexModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
