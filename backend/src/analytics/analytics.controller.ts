import { Controller, Get, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { AnalyticsService } from "./analytics.service"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "src/auth/common/decorator/roles.decorator"

@ApiTags("Admin - Analytics")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("api/admin/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @ApiOperation({ summary: "Get dashboard statistics" })
  @ApiResponse({ status: 200, description: "Return dashboard statistics" })
  getDashboardStats() {
    return this.analyticsService.getDashboardStats()
  }

  @Get("users")
  @ApiOperation({ summary: "Get user statistics" })
  @ApiResponse({ status: 200, description: "Return user statistics" })
  getUserStats() {
    return this.analyticsService.getUserStats()
  }

  @Get("quizzes")
  @ApiOperation({ summary: "Get quiz statistics" })
  @ApiResponse({ status: 200, description: "Return quiz statistics" })
  getQuizStats() {
    return this.analyticsService.getQuizStats()
  }

  @Get("engagement")
  @ApiOperation({ summary: "Get user engagement statistics" })
  @ApiResponse({ status: 200, description: "Return user engagement statistics" })
  getUserEngagement() {
    return this.analyticsService.getUserEngagement()
  }

  @Get("export")
  @ApiOperation({ summary: "Export all data for external analysis" })
  @ApiResponse({ status: 200, description: "Return exported data" })
  exportData() {
    return this.analyticsService.exportData()
  }
}

