import { DataSource } from 'typeorm';
import { Progress } from '../../src/progress/entities/progress.entity';

export const seedProgress = async (dataSource: DataSource) => {
  const progressRepository = dataSource.getRepository(Progress);

  const progressData = [
    {
      chainId: 1,
      progress: 50,
      score: 100,
      completed: false,
      lastAttempt: new Date(),
    },
    {
      chainId: 2,
      progress: 80,
      score: 200,
      completed: true,
      lastAttempt: new Date(),
    },
  ];

  await progressRepository.save(progressData);
};
