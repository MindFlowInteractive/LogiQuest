import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger"
import { QuizService } from "./quiz.service"
import { CreateQuizDto } from "./dto/create-quiz.dto"
import { UpdateQuizDto } from "./dto/update-quiz.dto"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "src/auth/common/decorator/roles.decorator"

@ApiTags("Admin - Quizzes")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("admin")
@Controller("api/admin/quizzes")
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @ApiOperation({ summary: 'Get all quizzes with pagination and filtering' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'difficulty', required: false, type: String })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Return all quizzes' })
  findAll(@Query() query) {
    return this.quizService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz by id' })
  @ApiResponse({ status: 200, description: 'Return quiz by id' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  findOne(@Param('id') id: number) {
    return this.quizService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new quiz' })
  @ApiResponse({ status: 201, description: 'Quiz created successfully' })
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update quiz" })
  @ApiResponse({ status: 200, description: "Quiz updated successfully" })
  @ApiResponse({ status: 404, description: "Quiz not found" })
  update(@Param('id') id: number, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quiz' })
  @ApiResponse({ status: 200, description: 'Quiz deleted successfully' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  remove(@Param('id') id: number) {
    return this.quizService.remove(id);
  }

  @Post(":id/bulk-import")
  @ApiOperation({ summary: "Bulk import questions to a quiz" })
  @ApiResponse({ status: 200, description: "Questions imported successfully" })
  @ApiResponse({ status: 404, description: "Quiz not found" })
  bulkImportQuestions(@Param('id') id: number, @Body() questions: any[]) {
    return this.quizService.bulkImportQuestions(id, questions)
  }
}

