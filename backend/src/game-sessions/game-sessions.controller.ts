import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { GameSessionsService } from './game-sessions.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
// import { UpdateGameSessionDto } from './dto/update-game-session.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@ApiTags('game-sessions')
@Controller('game-sessions')
export class GameSessionsController {
  constructor(private readonly gameSessionsService: GameSessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz game session' })
  @ApiResponse({ status: 201, description: 'Game session created' })
  create(@Body() createGameSessionDto: CreateGameSessionDto, @Request() req) {
    createGameSessionDto.userId = req.user.id;
    createGameSessionDto.correctAnswers = 0;
    createGameSessionDto.incorrectAnswers = 0;
    createGameSessionDto.answerHistory = [];
    createGameSessionDto.lifelinesUsed = [];

    return this.gameSessionsService.create(createGameSessionDto);
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
  // @ApiResponse({
  //   status: 200,
  //   description: 'Game session successfully updated',
  // })
  // @ApiResponse({ status: 400, description: 'Bad Request' })
  // @ApiResponse({ status: 404, description: 'Game session not found' })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateGameSessionDto: UpdateGameSessionDto,
  // ) {
  //   return this.gameSessionsService.update(+id, updateGameSessionDto);
  // }
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
  @ApiOperation({ summary: 'Submit an answer for a quiz' })
  @ApiParam({ name: 'id', type: 'number', description: 'Game session ID' })
  @ApiResponse({ status: 200, description: 'Answer processed' })
  submitAnswer(@Param('id') id: string, @Body() answerDto: SubmitAnswerDto) {
    return this.gameSessionsService.processAnswer(+id, answerDto);
  }
}
