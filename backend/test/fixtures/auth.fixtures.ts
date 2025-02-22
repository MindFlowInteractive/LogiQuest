import { DataSource } from 'typeorm';
import { User } from '../../src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedAuth(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  // Ensure database is clean before seeding
  await userRepo.clear();

  // Hash passwords securely before storing them
  const hashedPassword = await bcrypt.hash('Test@123', 10);

  // Insert test users with hashed passwords
  await userRepo.save([
    {
      id: 1, // Remove if auto-generated
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword, // Store securely hashed password
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: hashedPassword,
    },
  ]);
}
