import { DataSource } from 'typeorm';
import { Transaction } from '../../src/transaction/entities/transaction.entity';
import { User } from '../../src/users/entities/user.entity';

export const seedTransactions = async (dataSource: DataSource) => {
  const transactionRepository = dataSource.getRepository(Transaction);
  const userRepository = dataSource.getRepository(User);

  // Find an existing user or create one
  let user = await userRepository.findOne({ where: {} });

  if (!user) {
    user = await userRepository.save({
      email: 'testuser@example.com',
      password: 'hashedpassword',
    });
  }

  const transactionsData: Partial<Transaction>[] = [
    {
      user,
      amount: 100,
      type: 'deposit', // ✅ Use the allowed literal type directly
      status: 'completed', // ✅Use the allowed literal type directly
      createdAt: new Date(),
    },
    {
      user,
      amount: 50,
      type: 'purchase', //  Use the allowed literal type directly
      status: 'pending', //  Use the allowed literal type directly
      createdAt: new Date(),
    },
  ];

  await transactionRepository.save(transactionsData);
}
