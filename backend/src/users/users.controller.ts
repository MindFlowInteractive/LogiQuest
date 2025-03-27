import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProgressTrackingService } from 'src/progress/progess-tracking.service';
import { MulterFile } from 'src/common/types/multer.types';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly progressTrackingService: ProgressTrackingService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me/profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth()
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBearerAuth()
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/avatar')
  @ApiOperation({ summary: 'Upload user avatar' })
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB limit
      },
    }),
  )
  async uploadAvatar(@Request() req, @UploadedFile() file: MulterFile) {
    return this.usersService.updateAvatar(req.user.id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/achievements')
  @ApiOperation({ summary: 'Get user achievements' })
  @ApiBearerAuth()
  async getAchievements(@Request() req) {
    return this.usersService.getAchievements(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/statistics')
  @ApiOperation({ summary: 'Get user statistics' })
  @ApiBearerAuth()
  async getStatistics(@Request() req) {
    return this.usersService.getStatistics(req.user.id);
  }
}
