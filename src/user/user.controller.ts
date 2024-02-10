import { Controller, Get, Request } from '@nestjs/common';
import { AuthRes } from 'src/auth/dtos';
import { User } from 'src/schemas';

@Controller('user')
export class UserController {
  @Get('profile')
  getProfile(@Request() req): User & AuthRes {
    return req.user;
  }
}
