import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { GameSessionsService } from './game-sessions.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { UpdateGameSessionDto } from './dto/update-game-session.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateQuizSessionDto } from './dto/create-quiz-session.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { UseLifelineDto } from './dto/use-lifeline.dto';

@ApiTags('game-sessions')
@Controller('game-sessions')
export class GameSessionsController {
  constructor(private readonly gameSessionsService: GameSessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new game session' })
  @ApiResponse({
    status: 201,
    description: 'Game session successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createGameSessionDto: CreateGameSessionDto, @Request() req) {
    createGameSessionDto.userId = req.user.id;
    return this.gameSessionsService.create(createGameSessionDto);
  }

  @Post('quiz')
  @ApiOperation({ summary: 'Create a new quiz session' })
  @ApiResponse({
    status: 201,
    description: 'Quiz session successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  createQuizSession(
    @Body() createQuizSessionDto: CreateQuizSessionDto,
    @Request() req,
  ) {
    createQuizSessionDto.userId = req.user.id;
    return this.gameSessionsService.createQuizSession(createQuizSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all game sessions' })
  @ApiResponse({ status: 200, description: 'Returns all game sessions' })
  findAll() {
    return this.gameSessionsService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active game session for the user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the active game session for the user',
  })
  findActive(@Request() req) {
    return this.gameSessionsService.findActiveByUser(req.user.id);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get game session history for the user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the game session history for the user',
  })
  getSessionHistory(@Request() req) {
    return this.gameSessionsService.getSessionHistory(req.user.id);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get quiz statistics for the user' })
  @ApiResponse({
    status: 200,
    description: 'Returns quiz statistics for the user',
    schema: {
      type: 'object',
      properties: {
        totalQuizzes: { type: 'number' },
        averageScore: { type: 'number' },
        highestScore: { type: 'number' },
        totalCorrectAnswers: { type: 'number' },
        totalIncorrectAnswers: { type: 'number' },
        averageResponseTime: { type: 'number' },
      },
    },
  })
  getQuizStats(@Request() req) {
    return this.gameSessionsService.getQuizSessionStats(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a game session by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the game session',
  })
  @ApiResponse({ status: 200, description: 'Returns the game session' })
  @ApiResponse({ status: 404, description: 'Game session not found' })
  findOne(@Param('id') id: string) {
    return this.gameSessionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a game session' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the game session',
  })
  @ApiResponse({
    status: 200,
    description: 'Game session successfully updated',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Game session not found' })
  update(
    @Param('id') id: string,
    @Body() updateGameSessionDto: UpdateGameSessionDto,
  ) {
    return this.gameSessionsService.update(+id, updateGameSessionDto);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete a game session' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the game session',
  })
  @ApiResponse({
    status: 200,
    description: 'Game session successfully completed',
  })
  @ApiResponse({ status: 404, description: 'Game session not found' })
  completeSession(@Param('id') id: string) {
    return this.gameSessionsService.completeSession(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a game session' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the game session',
  })
  @ApiResponse({
    status: 200,
    description: 'Game session successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Game session not found' })
  remove(@Param('id') id: string) {
    return this.gameSessionsService.remove(+id);
  }

  @Post(':id/answer')
  @ApiOperation({ summary: 'Submit an answer for a game session step' })
  @ApiBody({ type: SubmitAnswerDto })
  @ApiResponse({
    status: 200,
    description: 'Returns the result of the answer submission',
    schema: {
      type: 'object',
      properties: {
        isCorrect: { type: 'boolean' },
        pointsAwarded: { type: 'number' },
        currentScore: { type: 'number' },
        feedback: { type: 'string' },
        nextStep: { type: 'number' },
        isCompleted: { type: 'boolean' },
      },
    },
  })
  async submitAnswer(
    @Param('id') id: string,
    @Body() answerData: SubmitAnswerDto,
  ) {
    return this.gameSessionsService.submitAnswer(
      id,
      answerData.stepId,
      answerData.answer,
      answerData.responseTime,
      answerData.lifelinesUsed,
    );
  }

  @Post(':id/lifeline')
  @ApiOperation({ summary: 'Use a lifeline in a quiz session' })
  @ApiBody({ type: UseLifelineDto })
  @ApiResponse({
    status: 200,
    description: 'Returns the result of using the lifeline',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async useLifeline(
    @Param('id') id: string,
    @Body() lifelineDto: UseLifelineDto,
  ) {
    return this.gameSessionsService.useLifeline(+id, lifelineDto);
  }

  @Get('game-session/:id')
  @ApiOperation({ summary: 'Get a game session by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the game session',
    // Reference to GameSession entity
  })
  @ApiResponse({ status: 404, description: 'Game session not found' })
  async getGameSession(@Param('id') id: number) {
    return this.gameSessionsService.findGameSessionOne(id);
  }
}
