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
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterFile } from 'src/common/types/multer.types';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ReqUser } from 'src/auth/common/decorator/get-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProgressTrackingService } from '../progress/progess-tracking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users') 
@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly progressTrackingService: ProgressTrackingService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Serialize(UserResponseDto) //for data serialization
  @Get('profile')
  @ApiBearerAuth() // Requires JWT authentication
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@ReqUser() user) {
    return this.usersService.getProfile(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  updateProfile(@ReqUser() user, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, dto);
  }

  @UseGuards(JwtAuthGuard) 
  @Patch('me/profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBearerAuth()

  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  changePassword(@ReqUser() user, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/avatar')
  @ApiOperation({ summary: 'Upload user avatar' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deactivate user account' })
  @ApiResponse({ status: 200, description: 'Account deactivated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  deactivateAccount(@ReqUser() user) {
    return this.usersService.deactivateAccount(user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  } 

  @Get(':me/progress/')
  @ApiOperation({ summary: 'Get user progress statistics' })
  @ApiResponse({
    status: 200,
    description: 'Returns overall user progress statistics',
  })
  async getTrackingUserProgress(@Param('me') me: string) {
    return this.progressTrackingService.getUserProgress(me);
  }

  @Get('me/categories/progress')
  @ApiOperation({ summary: 'Get progress by category' })
  @ApiResponse({
    status: 200,
    description: 'Returns progress statistics for each category',
  })
  async getCategoryProgress(userId: string) {
    return this.progressTrackingService.getCategoryProgress(userId);
  }
}
