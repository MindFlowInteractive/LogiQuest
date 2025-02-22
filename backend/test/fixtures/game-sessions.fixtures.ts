import { DataSource } from 'typeorm';
import { GameSession } from '../../src/game-sessions/entities/game-session.entity';
import { User } from '../../src/users/entities/user.entity';
import { Puzzle } from '../../src/puzzles/entities/puzzle.entity';

export async function seedGameSessions(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const puzzleRepo = dataSource.getRepository(Puzzle);
  const sessionRepo = dataSource.getRepository(GameSession);

  // Retrieve existing test users and puzzles
  const user = await userRepo.findOne({ where: { email: 'test@testing.com' } });
  const puzzle = await puzzleRepo.findOne({
    where: { title: 'Sample Puzzle' },
  });

  if (!user || !puzzle) {
    throw new Error(
      'Test user or puzzle not found! Ensure users and puzzles are seeded first.',
    );
  }

  // Insert test game sessions samples 
  await sessionRepo.insert([
    {
      user,
      puzzle,
      currentStep: 3,
      score: 200,
      status: 'active',
      attempts: 2,
      startedAt: new Date('2024-02-22T12:00:00.000Z'),
      lastActive: new Date('2024-02-22T12:30:00.000Z'),
    },
    {
      user,
      puzzle,
      currentStep: 5,
      score: 500,
      status: 'completed',
      attempts: 4,
      startedAt: new Date('2024-02-22T13:00:00.000Z'),
      lastActive: new Date('2024-02-22T13:45:00.000Z'),
    },
  ]);
}
