import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestingApp } from '../helpers/test-helpers';
import { DataSource } from 'typeorm';
import { seedGameSessions } from '../fixtures/game-sessions.fixtures';

describe('GameSessionController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let sessionId: number;
  let accessToken: string;

  beforeAll(async () => {
    app = await createTestingApp();
    dataSource = app.get(DataSource);

    // Seed database
    await seedGameSessions(dataSource);

    // Simulate user login and retrieve access token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'tester@testing.com', password: 'Tester@123' });

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  // test to Fetch All Game Sessions
  describe('GET /game-sessions', () => {
    it('should return all game sessions', async () => {
      const response = await request(app.getHttpServer())
        .get('/game-sessions')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  // test to Create a New Game Session
  describe('POST /game-sessions', () => {
    it('should create a new game session', async () => {
      const response = await request(app.getHttpServer())
        .post('/game-sessions')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          userId: 1, // Assuming the test user ID is 1
          puzzleId: 1, // Assuming the test puzzle ID is 1
          currentStep: 1,
          score: 50,
          status: 'active',
          attempts: 1,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('score', 50);
        });

      sessionId = response.body.id;
    });

    it('should fail when missing required fields', async () => {
      await request(app.getHttpServer())
        .post('/game-sessions')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(400);
    });
  });

  // test to Fetch a Specific Game Session
  describe('GET /game-sessions/:id', () => {
    it('should retrieve a specific game session', async () => {
      const response = await request(app.getHttpServer())
        .get(`/game-sessions/${sessionId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', sessionId);
          expect(res.body).toHaveProperty('score', 50);
        });
    });

    it('should return 404 for non-existing session', async () => {
      await request(app.getHttpServer())
        .get('/game-sessions/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });


  // test to  Update a Game Session
  describe('PATCH /game-sessions/:id', () => {
    it('should update an existing game session', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/game-sessions/${sessionId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ score: 300, status: 'completed' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('score', 300);
          expect(res.body).toHaveProperty('status', 'completed');
        });
    });

    it('should return 404 if session does not exist', async () => {
      await request(app.getHttpServer())
        .patch('/game-sessions/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ score: 100 })
        .expect(404);
    });
  });

  // test to Delete a Game Session
  describe('DELETE /game-sessions/:id', () => {
    it('should delete an existing game session', async () => {
      await request(app.getHttpServer())
        .delete(`/game-sessions/${sessionId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should return 404 if session does not exist', async () => {
      await request(app.getHttpServer())
        .delete('/game-sessions/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });
});
