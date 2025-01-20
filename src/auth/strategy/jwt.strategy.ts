import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { envs } from 'src/config/envs';
import { JwtPayload } from 'src/interfaces';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.jwtSecret,
      passReqToCallback: true,
    });
  }

  async validate(_: Request, payload: JwtPayload): Promise<User> {
    const { id } = payload;

    if (!id) throw new UnauthorizedException('Usuario no autorizado');

    const user = await this.userService.findOneById(id);

    if (!user) throw new UnauthorizedException('Usuario no autorizado');

    return user;
  }
}
