import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestingApp } from '../helpers/test-helpers';
import { DataSource } from 'typeorm';
import { seedProgress } from '../fixtures/progress.fixtures';

describe('ProgressController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let progressId: number;
  let accessToken: string;

  beforeAll(async () => {
    app = await createTestingApp();
    dataSource = app.get(DataSource);

    // Seed database with progress records
    await seedProgress(dataSource);

    // Simulate user login and retrieve access token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'tester@testing.com', password: 'Tester@123' });

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  // 🔹 Test: Fetch all progress records
  describe('GET /progress', () => {
    it('should return all progress records', async () => {
      const response = await request(app.getHttpServer())
        .get('/progress')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  // 🔹 Test: Create a new progress record
  describe('POST /progress', () => {
    it('should create a new progress record', async () => {
      const response = await request(app.getHttpServer())
        .post('/progress')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          chainId: 3,
          progress: 25,
          score: 50,
          completed: false,
          lastAttempt: new Date().toISOString(),
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.chainId).toBe(3);
        });

      progressId = response.body.id;
    });

    it('should return 400 when required fields are missing', async () => {
      await request(app.getHttpServer())
        .post('/progress')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(400);
    });
  });

  // 🔹 Test: Fetch a specific progress record
  describe('GET /progress/:id', () => {
    it('should retrieve a specific progress record', async () => {
      const response = await request(app.getHttpServer())
        .get(`/progress/${progressId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(progressId);
          expect(res.body.chainId).toBe(3);
        });
    });

    it('should return 404 for a non-existing progress record', async () => {
      await request(app.getHttpServer())
        .get('/progress/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  // 🔹 Test: Update progress
  describe('PATCH /progress/:id', () => {
    it('should update an existing progress record', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/progress/${progressId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ progress: 75, score: 150, completed: true })
        .expect(200)
        .expect((res) => {
          expect(res.body.progress).toBe(75);
          expect(res.body.score).toBe(150);
          expect(res.body.completed).toBe(true);
        });
    });

    it('should return 404 if progress record does not exist', async () => {
      await request(app.getHttpServer())
        .patch('/progress/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ progress: 90 })
        .expect(404);
    });
  });

  // 🔹 Test: Delete progress
  describe('DELETE /progress/:id', () => {
    it('should delete an existing progress record', async () => {
      await request(app.getHttpServer())
        .delete(`/progress/${progressId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should return 404 if progress record does not exist', async () => {
      await request(app.getHttpServer())
        .delete('/progress/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });
});
