import { DataSource } from 'typeorm';
import { Step } from '../../src/steps/entities/step.entity';
import { Puzzle } from '../../src/puzzles/entities/puzzle.entity';

export const seedSteps = async (dataSource: DataSource) => {
  const stepRepository = dataSource.getRepository(Step);
  const puzzleRepository = dataSource.getRepository(Puzzle);

  // Find an existing puzzle or create one
  let puzzle = await puzzleRepository.findOne({ where: {} });

  if (!puzzle) {
    puzzle = await puzzleRepository.save({
      title: 'Sample Puzzle',
      description: 'A sample puzzle for testing',
      difficulty: 2,
      points: 50,
      metadata: null,
    });
  }

  const stepsData = [
    {
      description: 'First step of the puzzle',
      order: 1,
      hints: ['Think logically', 'Look for patterns'],
      puzzle: puzzle,
    },
    {
      description: 'Second step of the puzzle',
      order: 2,
      hints: ['Try a different approach'],
      puzzle: puzzle,
    },
  ];

  await stepRepository.save(stepsData);
};
