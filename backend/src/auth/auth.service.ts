import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto, LoginDto, AuthResponseDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token-dto.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private refreshTokens: Record<string, string> = {}; // Temporary storage (Use DB in production)

  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService, //Ensure this service is properly injected
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterDto> {
    return {
      username: registerDto.username,
      email: registerDto.email,
      password: registerDto.password,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = { id: 1, username: loginDto.username }; // Replace with actual user lookup

    const accessToken = this.jwtService.sign(
      { sub: user.id },
      { secret: 'ACCESS_SECRET', expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: 'REFRESH_SECRET', expiresIn: '7d' },
    );

    this.refreshTokens[user.id] = refreshToken; // Store in DB in production

    return {
      accessToken,
      user,
      refreshToken, // Return refresh token to user
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      const decoded = jwt.verify(
        refreshToken,
        this.configService.get('JWT_REFRESH_SECRET'),
      ) as {
        sub: string;
      };
      const userId = decoded.sub;

      if (this.refreshTokens[userId] !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.login({ username: `user`, password: `password` }); // Replace with actual user lookup
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
