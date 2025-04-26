import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { ProgressModule } from '../progress/progress.module';
import { JwtModule } from '@nestjs/jwt';
import { QuizModule } from '../quiz/quiz.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ProgressModule),
    forwardRef(() => QuizModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
