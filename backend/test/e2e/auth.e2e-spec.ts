import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestingApp } from '../helpers/test-helpers';
import { DataSource } from 'typeorm';
import { seedAuth } from '../fixtures/auth.fixtures';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    app = await createTestingApp();
    dataSource = app.get(DataSource);

    // Seed test users
    await seedAuth(dataSource);
  });

  afterAll(async () => {
    await app.close();
  });


  //  Signup Tests
  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .set('Content-Type', 'application/json') // Explicit JSON header
        .send({
          name: 'Tester',
          email: 'testuser@example.com',
          password: 'Tester@123',
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'Tester'); 
      expect(response.body).toHaveProperty('email', 'testuser@example.com');
    });

    it('should fail if email is already registered', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .set('Content-Type', 'application/json')
        .send({
          name: 'tester',
          email: 'tester@tester.com',
          password: 'Tester@123',
        })
        .expect(400);
    });

    it('should fail if password is weak', async () => {
      const weakPasswords = ['123', 'password', 'qwerty', 'abc123']; 

      for (const weakPassword of weakPasswords) {
        await request(app.getHttpServer())
          .post('/auth/register')
          .set('Content-Type', 'application/json')
          .send({
            name: 'Weak Password',
            email: `weak+${weakPassword}@password.com`,
            password: weakPassword,
          })
          .expect(400);
      }
    });
  });

  //  Login Tests
  describe('POST /auth/login', () => {
    it('should login successfully and return tokens', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'tester@testing.com',
          password: 'Tester@123',
        })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');

      accessToken = response.body.accessToken;
      refreshToken = response.body.refreshToken; //  Save refresh token
    });

    it('should fail if credentials are incorrect', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'tester@testing.com',
          password: 'WrongPassword@123',
        })
        .expect(401);
    });

    it('should fail if email is missing', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({ password: 'Tester@123' })
        .expect(400);
    });
  });

  //  Refresh Token Tests
  describe('POST /auth/refresh', () => {
    beforeAll(async () => {
      if (!refreshToken) {
        // Ensure login runs first if refreshToken isn't set
        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .set('Content-Type', 'application/json')
          .send({
            email: 'tester@testing.com',
            password: 'Tester@123',
          })
          .expect(200);

        refreshToken = loginResponse.body.refreshToken;
      }
    });

    it('should refresh the access token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .set('Content-Type', 'application/json')
        .send({ refreshToken })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.accessToken).not.toBe(accessToken);

      accessToken = response.body.accessToken; 
    });

    it('should fail with an invalid refresh token', async () => {
      await request(app.getHttpServer())
        .post('/auth/refresh')
        .set('Content-Type', 'application/json')
        .send({ refreshToken: 'InvalidToken' })
        .expect(401);
    });
  });
});
