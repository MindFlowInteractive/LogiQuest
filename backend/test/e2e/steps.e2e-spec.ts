import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestingApp } from '../helpers/test-helpers';
import { DataSource } from 'typeorm';
import { seedSteps } from '../fixtures/steps.fixture';
import { Puzzle } from '../../src/puzzles/entities/puzzle.entity';

describe('StepsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let stepId: number;
  let accessToken: string;
  let puzzleId: number;

  beforeAll(async () => {
    app = await createTestingApp();
    dataSource = app.get(DataSource);

    // Seed database with steps
    await seedSteps(dataSource);

    // Find the puzzle ID to use in tests
    const puzzle = await dataSource
      .getRepository(Puzzle)
      .findOne({ where: {} });
    puzzleId = puzzle?.id || 1;

    // Simulate user login and retrieve access token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'tester@testing.com', password: 'Tester@123' });

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });


  //  Test: Fetch all steps
  describe('GET /steps', () => {
    it('should return all steps', async () => {
      const response = await request(app.getHttpServer())
        .get('/steps')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });


  //  Test: Create a new step
  describe('POST /steps', () => {
    it('should create a new step', async () => {
      const response = await request(app.getHttpServer())
        .post('/steps')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          description: 'A new step for testing',
          order: 3,
          hints: ['Try thinking outside the box'],
          puzzleId: puzzleId,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.order).toBe(3);
        });

      stepId = response.body.id;
    });

    it('should return 400 when required fields are missing', async () => {
      await request(app.getHttpServer())
        .post('/steps')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(400);
    });
  });


  //  Test: Fetch a specific step
  describe('GET /steps/:id', () => {
    it('should retrieve a specific step', async () => {
      const response = await request(app.getHttpServer())
        .get(`/steps/${stepId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(stepId);
          expect(res.body.order).toBe(3);
        });
    });

    it('should return 404 for a non-existing step', async () => {
      await request(app.getHttpServer())
        .get('/steps/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });


  //  Test: Update a step
  describe('PATCH /steps/:id', () => {
    it('should update an existing step', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/steps/${stepId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ order: 4 })
        .expect(200)
        .expect((res) => {
          expect(res.body.order).toBe(4);
        });
    });

    it('should return 404 if step does not exist', async () => {
      await request(app.getHttpServer())
        .patch('/steps/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ order: 5 })
        .expect(404);
    });
  });


  //  Test: Delete a step
  describe('DELETE /steps/:id', () => {
    it('should delete an existing step', async () => {
      await request(app.getHttpServer())
        .delete(`/steps/${stepId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should return 404 if step does not exist', async () => {
      await request(app.getHttpServer())
        .delete('/steps/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });
});
