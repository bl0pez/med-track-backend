import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hasher, JwtPayload } from 'src/interfaces';
import { BcryptPlugin } from 'src/plugins/bcrypt.plugin';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private hasher: Hasher;

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
    this.hasher = new BcryptPlugin();
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    delete user.password;

    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async refreshToken(user: User) {
    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatch = await this.hasher.compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    return user;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
