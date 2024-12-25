import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { RefreshTokenConfigs } from 'src/common/configs';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JWTRefreshStragtegy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(RefreshTokenConfigs.KEY)
    private readonly jwtConfig: ConfigType<typeof RefreshTokenConfigs>,
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
