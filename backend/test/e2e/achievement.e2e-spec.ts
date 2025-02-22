import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedAchievements } from 'test/fixtures/achievements.fixtures';
import { createTestingApp } from 'test/helpers/test-helpers';
import { DataSource } from 'typeorm';

describe('AchievementsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let newAchievement: string;

  beforeAll(async () => {
    app = await createTestingApp();
    dataSource = app.get(DataSource);
    await seedAchievements(dataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  // CREATE a new achievement first
  it('POST /achievements - should create a new achievement', async () => {
    const response = await request(app.getHttpServer())
      .post('/achievements')
      .send({ name: 'New Achievement', description: 'New milestone' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('New Achievement');
    newAchievement = response.body.id; // Save ID for later tests
  });

  //  GET all achievements
  it('GET /achievements - should return all achievements', async () => {
    const response = await request(app.getHttpServer())
      .get('/achievements')
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  // GET specific achievement
  it('GET /achievements/:id - should return an existing achievement', async () => {
    const response = await request(app.getHttpServer())
      .get(`/achievements/${newAchievement}`)
      .expect(200);

    expect(response.body.id).toBe(newAchievement);
    expect(response.body.name).toBe('New Achievement');
  });

  //  GET non-existent achievement should return 404
  it('GET /achievements/:id - should return 404 for non-existent achievement', async () => {
    await request(app.getHttpServer())
      .get('/achievements/999') // Non-existing ID
      .expect(404);
  });

  //  POST should return 400 when missing required fields
  it('POST /achievements - should return 400 for missing fields', async () => {
    await request(app.getHttpServer())
      .post('/achievements')
      .send({}) // Empty payload
      .expect(400);
  });

  //  UPDATE achievement
  it('PUT /achievements/:id - should update an achievement', async () => {
    const response = await request(app.getHttpServer())
      .put(`/achievements/${newAchievement}`)
      .send({ name: 'Updated Achievement', description: 'Updated Description' })
      .expect(200);

    expect(response.body.name).toBe('Updated Achievement');
    expect(response.body.description).toBe('Updated Description'); 
  });

  //  UPDATE should return 400 when data is invalid
  it('PUT /achievements/:id - should return 400 for invalid data', async () => {
    await request(app.getHttpServer())
      .put(`/achievements/${newAchievement}`)
      .send({ name: '' }) // Invalid data
      .expect(400);
  });

  // DELETE the achievement
  it('DELETE /achievements/:id - should delete an achievement', async () => {
    await request(app.getHttpServer())
      .delete(`/achievements/${newAchievement}`)
      .expect(200);
  });

  //  DELETE non-existing achievement should return 404
  it('DELETE /achievements/:id - should return 404 for non-existing achievement', async () => {
    await request(app.getHttpServer())
      .delete('/achievements/999') // Non-existing ID
      .expect(404);
  });
});
