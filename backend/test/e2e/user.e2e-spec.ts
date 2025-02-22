import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestingApp } from '../helpers/test-helpers';
import { DataSource } from 'typeorm';
import { seedUsers } from '../fixtures/user.fixture';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let userId: number;
  let accessToken: string;

  beforeAll(async () => {
    app = await createTestingApp();
    dataSource = app.get(DataSource);

    // Seed users
    await seedUsers(dataSource);

    // Simulate user login
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testuser1@example.com', password: 'Tester@123' });

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  //  Fetch all users
  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  //  Create a user
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'NewUser@123',
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', 'newuser@example.com');
      userId = response.body.id;
    });

    it('should fail when email already exists', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          username: 'duplicateuser',
          email: 'testuser1@example.com', // Already in the database
          password: 'Duplicate@123',
        })
        .expect(400);
    });
  });

  // test to fetch a specific user
  describe('GET /users/:id', () => {
    it('should retrieve a specific user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('email', 'newuser@example.com');
    });

    it('should return 404 for non-existing user', async () => {
      await request(app.getHttpServer())
        .get('/users/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  // test to Update a user
  describe('PATCH /users/:id', () => {
    it('should update an existing user', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ username: 'updateduser' })
        .expect(200);

      expect(response.body).toHaveProperty('username', 'updateduser');
    });

    it('should return 404 if user does not exist', async () => {
      await request(app.getHttpServer())
        .patch('/users/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ username: 'nonexistent' })
        .expect(404);
    });
  });

  // test to Delete a user
  describe('DELETE /users/:id', () => {
    it('should delete an existing user', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should return 404 if user does not exist', async () => {
      await request(app.getHttpServer())
        .delete('/users/9999')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });
});
