import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../userRelated/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization?.split(' ')[0] !== 'Bearer') {
      throw new ForbiddenException('Forbidden request', {
        cause: new Error(),
        description: 'invalid token',
      });
    }

    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      const payload = this.authService.validateToken(token);
      if (payload) {
        request['user'] = {
          user_id: payload.user_id,
          username: payload.username,
          email: payload.email,
          role: payload.role,
        };
        return true;
      }
    }

    return false;
  }
}
