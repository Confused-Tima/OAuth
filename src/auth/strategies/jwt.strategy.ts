import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenConfigs } from 'src/common/configs';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JWTStragtegy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AccessTokenConfigs.KEY)
    private readonly jwtConfig: ConfigType<typeof AccessTokenConfigs>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }
  validate(payload: User) {
    return payload;
  }
}
