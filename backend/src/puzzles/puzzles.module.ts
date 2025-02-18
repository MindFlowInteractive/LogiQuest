import { Module } from '@nestjs/common';
import { PuzzlesService } from './puzzles.service';
import { PuzzlesController } from './puzzles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puzzle } from './entities/puzzle.entity';
import { Step } from 'src/steps/entities/step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Puzzle, Step])],
  controllers: [PuzzlesController],
  providers: [PuzzlesService],
  exports: [PuzzlesService],
})
export class PuzzlesModule {}
