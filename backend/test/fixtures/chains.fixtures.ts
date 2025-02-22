import { DataSource } from 'typeorm';
import { Chain } from '../../src/chain/entities/chain.entity'; 

export async function seedChains(dataSource: DataSource) {
  const repository = dataSource.getRepository(Chain);

  await repository.clear(); // Clean the table before inserting new data

  await repository.save([
    { id: 1, name: 'Stark' },
    { id: 2, name: 'Pi' },
  ]);
}
