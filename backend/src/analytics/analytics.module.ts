import { Module, forwardRef } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AnalyticsService } from "./analytics.service"
import { AnalyticsController } from "./analytics.controller"
import { Quiz } from "../quiz/entities/quiz.entity"
import { UserQuiz } from "../quiz/entities/user-quiz.entity"
import { User } from "src/users/entities/user.entity"
import { UsersModule } from "src/users/users.module"
import { RolesGuard } from "src/auth/guards/roles.guard"

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, User, UserQuiz]), forwardRef(() => UsersModule)],
  providers: [AnalyticsService, RolesGuard],
  controllers: [AnalyticsController],
  exports: [RolesGuard]
})
export class AnalyticsModule {}

