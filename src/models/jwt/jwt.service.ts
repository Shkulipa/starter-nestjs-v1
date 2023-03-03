import { sign, verify } from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUserJtwData } from 'src/common/interfaces/userJwtData.interfaces';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger(JwtService.name);

  private verifyToken(token: string, secret: string) {
    try {
      const decoded = verify(token, secret);

      return decoded;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
    }
  }

  verifyAccessToken(token: string) {
    try {
      const SECRET_ACCESS = this.configService.get<string>('SECRET_ACCESS');
      const decoded = this.verifyToken(token, SECRET_ACCESS);
      return decoded;
    } catch (err) {
      throw err;
    }
  }

  private createToken(
    jwtData: IUserJtwData,
    secret: string,
    expiresIn: string,
  ) {
    return sign(jwtData, secret, {
      expiresIn,
    });
  }

  createTokens(jwtData: IUserJtwData) {
    const SECRET_ACCESS = this.configService.get<string>('SECRET_ACCESS');

    const accessToken = this.createToken(jwtData, SECRET_ACCESS, '14d');

    return { accessToken };
  }
}
