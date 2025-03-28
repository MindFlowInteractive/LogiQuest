import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile-dto.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const newUser: User = {
      ...createUserDto,
      walletAddress: createUserDto.walletAddress || '',
      totalScore: 0,
      profileCustomization: {
        theme: createUserDto.profileCustomization?.theme || 'system',
        avatarUrl: createUserDto.profileCustomization?.avatarUrl || '',
        bio: createUserDto.profileCustomization?.bio || '',
      },
      statistics: {
        quizzesTaken: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        averageScore: 0,
        highestScore: 0,
        fastestCompletionTime: 0,
      },
      categoryProficiency: {},
      performanceHistory: {
        daily: [],
        weekly: [],
        monthly: [],
      },
    };
    const user = this.usersRepository.create(newUser);
    this.usersRepository.save(user);
    console.log(user)
    return plainToClass(UserResponseDto, newUser, {
      excludeExtraneousValues: true,
    });
  }

  async getProfile(userId: number): Promise<ProfileResponseDto> {
    const user = this.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return plainToClass(ProfileResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateProfile(
    userId: number,
    dto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (dto.username) user.username = dto.username;
    if (dto.walletAddress) user.walletAddress = dto.walletAddress;

    if (dto.profileCustomization) {
      user.profileCustomization = {
        ...user.profileCustomization,
        ...dto.profileCustomization,
      };
    }

    user.updatedAt = new Date();
    await this.usersRepository.save(user);

    return plainToClass(
      ProfileResponseDto,
      {
        username: user.username,
        email: user.email,
        walletAddress: user.walletAddress,
        createdAt: user.createdAt,
        totalScore: user.totalScore,
        statistics: user.statistics,
        profileCustomization: user.profileCustomization,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async changePassword(
    userId: number,
    dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'password'], 
    });
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) throw new ForbiddenException('Incorrect old password');

    user.password = await bcrypt.hash(dto.newPassword, 10);
    user.updatedAt = new Date();
    await this.usersRepository.save(user);

    return { message: 'Password updated successfully' };
  }

  async deactivateAccount(userId: number): Promise<{ message: string }> {
    const result = await this.usersRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return { message: 'Account deactivated successfully' };
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) =>
      plainToClass(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async getUserById(userId: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async deleteUser(userId: number): Promise<{ message: string }> {
    const result = await this.usersRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async updateUserStatistics(
    userId: number,
    quizResult: {
      score: number;
      correctAnswers: number;
      incorrectAnswers: number;
      completionTime: number;
      category: string;
    },
  ): Promise<UserResponseDto> {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    // Update basic statistics
    user.totalScore = (user.totalScore || 0) + quizResult.score;

    const stats = user.statistics || {
      quizzesTaken: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      averageScore: 0,
      highestScore: 0,
      fastestCompletionTime: 0,
    };

    stats.quizzesTaken += 1;
    stats.correctAnswers += quizResult.correctAnswers;
    stats.incorrectAnswers += quizResult.incorrectAnswers;
    stats.averageScore =
      (stats.averageScore * (stats.quizzesTaken - 1) + quizResult.score) /
      stats.quizzesTaken;
    stats.highestScore = Math.max(stats.highestScore, quizResult.score);
    stats.fastestCompletionTime = Math.min(
      stats.fastestCompletionTime,
      quizResult.completionTime,
    );

    user.statistics = stats;

    // Update category proficiency
    const category = quizResult.category.toLowerCase();
    user.categoryProficiency = user.categoryProficiency || {};

    const catStats = user.categoryProficiency[category] || {
      quizzesTaken: 0,
      correctAnswers: 0,
      averageScore: 0,
      lastAttempt: new Date(),
    };

    catStats.quizzesTaken += 1;
    catStats.correctAnswers += quizResult.correctAnswers;
    catStats.averageScore =
      (catStats.averageScore * (catStats.quizzesTaken - 1) + quizResult.score) /
      catStats.quizzesTaken;
    catStats.lastAttempt = new Date();

    user.categoryProficiency[category] = catStats;

    // Update performance history
    const now = new Date();
    user.performanceHistory = user.performanceHistory || {
      daily: [],
      weekly: [],
      monthly: [],
    };

    // Daily performance
    const today = new Date(now.setHours(0, 0, 0, 0));
    const dailyEntry = user.performanceHistory.daily.find(
      (entry) => new Date(entry.date).getTime() === today.getTime(),
    );

    if (dailyEntry) {
      dailyEntry.score += quizResult.score;
    } else {
      user.performanceHistory.daily.push({
        date: today,
        score: quizResult.score,
      });
    }

    // Weekly performance
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekNumber = this.getWeekNumber(today);
    const year = today.getFullYear();

    const weeklyEntry = user.performanceHistory.weekly.find(
      (entry) => entry.week === weekNumber && entry.year === year,
    );

    if (weeklyEntry) {
      weeklyEntry.score += quizResult.score;
    } else {
      user.performanceHistory.weekly.push({
        week: weekNumber,
        year,
        score: quizResult.score,
      });
    }

    // Monthly performance
    const month = today.getMonth() + 1; // 1-12
    const monthlyEntry = user.performanceHistory.monthly.find(
      (entry) => entry.month === month && entry.year === year,
    );

    if (monthlyEntry) {
      monthlyEntry.score += quizResult.score;
    } else {
      user.performanceHistory.monthly.push({
        month,
        year,
        score: quizResult.score,
      });
    }

    // Keep only last 30 days, 12 weeks, and 12 months for performance
    user.performanceHistory.daily = user.performanceHistory.daily
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30);

    user.performanceHistory.weekly = user.performanceHistory.weekly
      .sort((a, b) => b.year - a.year || b.week - a.week)
      .slice(0, 12);

    user.performanceHistory.monthly = user.performanceHistory.monthly
      .sort((a, b) => b.year - a.year || b.month - a.month)
      .slice(0, 12);

    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const week1 = new Date(d.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((d.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7,
      )
    );
  }
}
