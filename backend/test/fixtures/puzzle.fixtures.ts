import { DataSource } from 'typeorm';
import { Puzzle } from '../../src/puzzles/entities/puzzle.entity';

export const seedPuzzles = async (dataSource: DataSource) => {
  const puzzleRepository = dataSource.getRepository(Puzzle);

  const puzzles = [
    {
      title: 'Puzzle One',
      description: 'Solve this puzzle to advance',
      difficulty: 2,
      points: 100,
      metadata: { type: 'text', hint: 'Think outside the box' },
    },
    {
      title: 'Puzzle Two',
      description: 'Another tricky puzzle',
      difficulty: 4,
      points: 200,
      metadata: { type: 'image', url: 'https://example.com/puzzle.jpg' },
    },
  ];

  await puzzleRepository.save(puzzles);
};
