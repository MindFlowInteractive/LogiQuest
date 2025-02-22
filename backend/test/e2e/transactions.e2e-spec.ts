import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestingApp } from '../helpers/test-helpers';
import { DataSource } from 'typeorm';
import { seedTransactions } from '../fixtures/transactios.fixtures';
import { User } from '../../src/users/entities/user.entity';

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let transactionId: number;
  let accessToken: string;
  let userId: number;

  beforeAll(async () => {
    app = await createTestingApp();
    dataSource = app.get(DataSource);

    // Seed database with transactions
    await seedTransactions(dataSource);

    // Find the user ID to use in tests
    const user = await dataSource.getRepository(User).findOne({ where: {} });
    userId = user?.id || 1;

    // Simulate user login and retrieve access token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testuser@example.com', password: 'password123' });

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  // 🔹 Test: Fetch all transactions
  describe('GET /transactions', () => {
    it('should return all transactions', async () => {
      const response = await request(app.getHttpServer())
        .get('/transactions')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  // 🔹 Test: Create a new transaction
  describe('POST /transactions', () => {
    it('should create a new transaction', async () => {
      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          userId: userId,
          amount: 200,
          type: 'withdrawal',
          status: 'pending',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.type).toBe('withdrawal');
        });

      transactionId = response.body.id;
    });

    it('should return 400 when required fields are missing', async () => {
      await request(app.getHttpServer())
        .post('/transactions')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(400);
    });
  });

  // 🔹 Test: Fetch a specific transaction
  describe('GET /transactions/:id', () => {
    it('should retrieve a specific transaction', async () => {
      const response = await request(app.getHttpServer())
        .get(`/transactions/${transactionId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(transactionId);
          expect(res.body.amount).toBe(200);
        });
    });

    it('should return 404 for a non-existing transaction', async () => {
      await request(app.getHttpServer())
        .get('/transactions/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  // 🔹 Test: Update a transaction status
  describe('PATCH /transactions/:id', () => {
    it('should update the transaction status', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/transactions/${transactionId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ status: 'completed' })
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('completed');
        });
    });

    it('should return 404 if transaction does not exist', async () => {
      await request(app.getHttpServer())
        .patch('/transactions/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ status: 'failed' })
        .expect(404);
    });
  });

  // 🔹 Test: Delete a transaction
  describe('DELETE /transactions/:id', () => {
    it('should delete a transaction', async () => {
      await request(app.getHttpServer())
        .delete(`/transactions/${transactionId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should return 404 if transaction does not exist', async () => {
      await request(app.getHttpServer())
        .delete('/transactions/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });
});
