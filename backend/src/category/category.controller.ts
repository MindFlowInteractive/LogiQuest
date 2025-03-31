import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Puzzle, PuzzleDifficulty } from '../puzzles/entities/puzzle.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Categories') // Group endpoints under "categories" in Swagger UI
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of categories',
    isArray: true,
  })
  listCategories(): Promise<string[]> {
    return this.categoryService.listCategories();
  }

  @Get(':category/puzzles')
  @ApiOperation({
    summary: 'Get puzzles under a category with difficulty levels',
  })
  @ApiParam({
    name: 'category',
    description: 'The name of the category e.g math',
  })
  @ApiQuery({
    name: 'difficulty',
    description: 'The difficulty of the category e.g medium',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Puzzle under category',
    isArray: true,
  })
  getPuzzlesByCategory(
    @Param('category') category: string,
    @Query('difficulty') difficulty?: PuzzleDifficulty,
  ): Promise<Puzzle[]> {
    return this.categoryService.getPuzzlesByCategory(category, difficulty);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get stats of a category' })
  @ApiResponse({
    status: 200,
    description: 'Get category statistics',
    isArray: true,
  })
  getCategoryStatistics(): Promise<{ category: string; count: number }[]> {
    return this.categoryService.getCategoryStatistics();
  }
}
