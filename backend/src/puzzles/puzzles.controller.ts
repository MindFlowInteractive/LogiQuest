import { Controller, Get, Post, Body, Param, NotFoundException} from '@nestjs/common';
import { PuzzlesService } from './puzzles.service';
import { Puzzle } from './entities/puzzle.entity';
import { Step } from 'src/steps/entities/step.entity';

@Controller('puzzles')
export class PuzzlesController {
  constructor(
    private readonly puzzleService: PuzzlesService) {}

  @Get()
  async findAll(): Promise<{ puzzles: Puzzle[] }> {
    const puzzles = await this.puzzleService.findAll();
    return { puzzles };
  }

  @Get(':puzzleId')
  async findOne(@Param('puzzleId') puzzleId: number): Promise<{ puzzle: Puzzle }> {
    const puzzle = await this.puzzleService.findOne(puzzleId);
    if (!puzzle) {
      throw new NotFoundException(`Puzzle with ID ${puzzleId} not found`);
    }
    return { puzzle };
  }

  @Post()
  async create(@Body() newPuzzle: Omit<Puzzle, 'id'>): Promise<{ puzzle: Puzzle }> {
    const puzzle = await this.puzzleService.create(newPuzzle);
    return { puzzle };
  }

  @Post(':puzzleId/validate')
  async validate(
    @Param('puzzleId') puzzleId: number,
    @Body() userSteps: Step[],
  ): Promise<{ isValid: boolean; score: number }> {
    const isValid = await this.puzzleService.validateStepOrder(puzzleId, userSteps);
    const score = await this.puzzleService.calculateScore(puzzleId, userSteps);
    return { isValid, score };
  }

  @Get(':puzzleId/:stepId/hint')
  async getHint(
    @Param('puzzleId') puzzleId: number,
    @Param('stepId') stepId: number,
  ): Promise<{ hint: string | null }> {
    const hint = await this.puzzleService.getHint(puzzleId, stepId);
    return { hint };
  }
}
