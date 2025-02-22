import { DataSource } from 'typeorm';
import { User } from '../../src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const hashedPassword = await bcrypt.hash('Tester@123', 10); // Hash password

  const usersData: Partial<User>[] = [
    {
      username: 'testuser1',
      email: 'testuser1@example.com',
      password: hashedPassword,
      walletAddress: '0x1234567890abcdef',
    },
    {
      username: 'testuser2',
      email: 'testuser2@example.com',
      password: hashedPassword,
      walletAddress: '0xfedcba0987654321',
    },
  ];

  await userRepository.save(usersData);
};
