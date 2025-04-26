import { forwardRef, Module } from "@nestjs/common"
import { AdminController } from "./admin.controller"
import { AdminService } from "./admin.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "src/users/entities/user.entity"
import { QuizModule } from "src/quiz/quiz.module"
import { AnalyticsModule } from "src/analytics/analytics.module"
import { UsersModule } from "src/users/users.module"
import { JwtModule } from "@nestjs/jwt"

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    forwardRef(() => QuizModule), // Resolve circular dependency if needed
    forwardRef(() => AnalyticsModule), // Resolve circular dependency if needed
    forwardRef(() => UsersModule), // Resolve circular dependency if needed
    JwtModule.register({
    secret: process.env.JWT_SECRET, // Ensure this is set in your .env file
    signOptions: { expiresIn: '1h' },
  }),
],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, TypeOrmModule],
})
export class AdminModule {}

