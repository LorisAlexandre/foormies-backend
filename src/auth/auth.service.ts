import {
  Body,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthRes, LoginDto, RegisterDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<AuthRes> {
    const user = await this.userService.findOne(loginDto.email);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (!bcrypt.compareSync(user.password, loginDto.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '3d',
      }),
    };
  }

  async signUp(registerDto: RegisterDto): Promise<AuthRes> {
    const user = await this.userService.findOne(registerDto.email);

    if (user) {
      throw new HttpException('User already exists', 409);
    }

    const createdUser = await this.userService.createOne(registerDto);

    const payload = { sub: createdUser._id, email: createdUser.email };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '3d',
      }),
    };
  }
}
