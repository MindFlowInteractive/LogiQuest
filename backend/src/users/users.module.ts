import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { ProgressModule } from 'src/progress/progress.module';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User]),forwardRef(() => ProgressModule)],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
