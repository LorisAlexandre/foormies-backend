import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRes, LoginDto, RegisterDto } from './dtos';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.signIn(loginDto);
  }

  @Public()
  @Post('register')
  singnUp(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }

  // Fetch un profile
  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
