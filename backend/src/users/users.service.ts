import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { MulterFile } from 'src/common/types/multer.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, dto);
    await this.userRepository.save(user);
    return { message: 'Profile updated successfully', user };
  }

  async updateAvatar(userId: string, file: MulterFile) {
    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) throw new NotFoundException('User not found');

    // Delete old avatar if exists
    if (user.avatarUrl) {
      const oldAvatarPath = path.join(process.cwd(), user.avatarUrl);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // Update avatar URL
    user.avatarUrl = file.path.replace(/\\/g, '/'); // Convert Windows path to URL format
    await this.userRepository.save(user);

    return {
      message: 'Avatar updated successfully',
      avatarUrl: user.avatarUrl,
    };
  }

  async getAchievements(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) throw new NotFoundException('User not found');
    return user.achievements || [];
  }

  async getStatistics(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) throw new NotFoundException('User not found');
    return user.statistics || {
      puzzlesSolved: 0,
      totalPoints: 0,
      rank: 'Novice',
      completionRate: 0,
    };
  }

  async deleteUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}
