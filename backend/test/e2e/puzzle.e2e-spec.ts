import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestingApp } from '../helpers/test-helpers';
import { DataSource } from 'typeorm';
import { seedPuzzles } from '../fixtures/puzzle.fixtures';

describe('PuzzleController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let puzzleId: number;
  let accessToken: string;

  beforeAll(async () => {
    app = await createTestingApp();
    dataSource = app.get(DataSource);

    // Seed database with test puzzles
    await seedPuzzles(dataSource);

    // Simulate user login and retrieve access token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'tester@testing.com', password: 'Tester@123' });

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });


  //Test: Fetch all puzzles
  describe('GET /puzzles', () => {
    it('should return all puzzles', async () => {
      const response = await request(app.getHttpServer())
        .get('/puzzles')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });


  // Test: Create a new puzzle
  describe('POST /puzzles', () => {
    it('should create a new puzzle', async () => {
      const response = await request(app.getHttpServer())
        .post('/puzzles')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'New Puzzle',
          description: 'This is a test puzzle',
          difficulty: 3,
          points: 150,
          metadata: { type: 'image', url: 'https://example.com/puzzle.jpg' },
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe('New Puzzle');
        });

      puzzleId = response.body.id;
    });

    it('should return 400 when required fields are missing', async () => {
      await request(app.getHttpServer())
        .post('/puzzles')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(400);
    });
  });


  // Test: Fetch a specific puzzle
  describe('GET /puzzles/:id', () => {
    it('should retrieve a specific puzzle', async () => {
      const response = await request(app.getHttpServer())
        .get(`/puzzles/${puzzleId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(puzzleId);
          expect(res.body.title).toBe('New Puzzle');
        });
    });

    it('should return 404 for a non-existing puzzle', async () => {
      await request(app.getHttpServer())
        .get('/puzzles/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });


  // Test: Update a puzzle
  describe('PATCH /puzzles/:id', () => {
    it('should update an existing puzzle', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/puzzles/${puzzleId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'Updated Puzzle', points: 200 })
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe('Updated Puzzle');
          expect(res.body.points).toBe(200);
        });
    });

    it('should return 404 if puzzle does not exist', async () => {
      await request(app.getHttpServer())
        .patch('/puzzles/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'Non-existent Puzzle' })
        .expect(404);
    });
  });


  // Test: Delete a puzzle
  describe('DELETE /puzzles/:id', () => {
    it('should delete an existing puzzle', async () => {
      await request(app.getHttpServer())
        .delete(`/puzzles/${puzzleId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should return 404 if puzzle does not exist', async () => {
      await request(app.getHttpServer())
        .delete('/puzzles/999') //asuming puzzle 999 is not available 
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });
});
