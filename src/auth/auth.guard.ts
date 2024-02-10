import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    return this.verifyAccessToken(request);
  }

  private verifyAccessToken(req: Request): Promise<boolean> {
    const accessToken = this.extractAccessTokenFromHeader(req);

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    return new Promise((resolve, reject) => {
      try {
        const payload = this.jwtService.verify(accessToken, {
          secret: this.config.get<string>('JWT_SECRET'),
        });

        const refreshToken = this.extractRefreshTokenFromHeader(req);

        req['user'] = { ...payload, accessToken, refreshToken };
        resolve(true);
      } catch (error) {
        if (this.verifyRefreshToken(req)) {
          resolve(true);
        } else reject(new UnauthorizedException());
      }
    });
  }

  private extractAccessTokenFromHeader(req: Request): string | undefined {
    if (!req.headers.authorization) {
      return undefined;
    }
    const [type, token] = req.headers.authorization.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private verifyRefreshToken(req: Request): boolean {
    const refreshToken = this.extractRefreshTokenFromHeader(req);

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.config.get<string>('JWT_SECRET'),
      });

      const accessToken = this.jwtService.sign(payload);

      req['user'] = { ...payload, accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
  private extractRefreshTokenFromHeader(req: Request): string | undefined {
    if (!req.headers['x-refresh-token']) {
      return undefined;
    }
    const [type, token] =
      (req.headers['x-refresh-token'] as string).split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
