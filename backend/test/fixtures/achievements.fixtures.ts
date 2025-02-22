import { DataSource } from 'typeorm';
import { Achievement } from '../../src/achievements/entities/achievement.entity';
import { User } from '../../src/users/entities/user.entity';

export async function seedAchievements(dataSource: DataSource) {
  const achievementRepo = dataSource.getRepository(Achievement);
  const userRepo = dataSource.getRepository(User);

  //  clean the test data before inserting new one
  await achievementRepo.clear();

  // fetch an existing test user (or create one)
  let user = await userRepo.findOne({ where: {} });
  if (!user) {
    user = await userRepo.save({
      id: 1, // not neede if we're using auto-generated IDs
      name: 'Test User',
      email: 'test@example.com',
    });
  }

  // Insert test achievements linked to the user
  await achievementRepo.save([
    {
      user, // Reference existing user
      type: 'Badge',
      title: 'First Login',
      description: 'Awarded for completing the first login.',
      nftTokenId: '123456789',
      unlockedAt: new Date('2025-02-22T08:00:00Z'),
    },
    {
      user,
      type: 'Trophy',
      title: 'Top Contributor',
      description: 'Awarded for answering 10 questions.',
      nftTokenId: null,
      unlockedAt: new Date(),
    },
  ]);
}
