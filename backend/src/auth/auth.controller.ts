import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, AuthResponseDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token-dto.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Authentication') // This groups your controller under the "Authentication" tag
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Public()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto }) // Describes the body for the 'register' endpoint
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request, invalid data.' })
  async register(@Body() registerDto: CreateUserDto): Promise<RegisterDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login an existing user' })
  @ApiBody({ type: LoginDto }) // Describes the body for the 'login' endpoint
  @ApiResponse({
    status: 200,
    description: 'Login successful.',
    type: AuthResponseDto, // Response body type
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }
  @Post('refresh')
  @Public()
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
