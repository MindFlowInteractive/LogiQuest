import { Controller, Get, UseGuards, Post, Body } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { AdminService } from "./admin.service"
import { RolesGuard } from "../auth/guards/roles.guard"
import { LoginDto } from "./dto/login.dto"
import { Roles } from "src/auth/common/decorator/roles.decorator"

@ApiTags("Admin")
@Controller("api/admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Check admin access" })
  @ApiResponse({ status: 200, description: "Admin access confirmed" })
  checkAdminAccess() {
    return { message: "Admin access confirmed" }
  }
}

