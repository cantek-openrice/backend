// auth/auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization?.split(' ')[0] !== 'Bearer') {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'invalid token',
      });
    }

    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      const payload = this.authService.validateToken(token);
      if (payload) {
        request.user = {
          id: 1,
          username: 'admin',
        };
        return true;
      }
    }

    return false;
  }
}
