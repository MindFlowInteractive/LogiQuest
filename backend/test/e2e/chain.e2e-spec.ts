import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestingApp } from '../helpers/test-helpers';
import { DataSource } from 'typeorm';
import { seedChains } from '../fixtures/chains.fixtures';

describe('ChainController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdChainId: number;

  beforeAll(async () => {
    app = await createTestingApp();
    dataSource = app.get(DataSource);
    await seedChains(dataSource);

    //  Ensure chain creation runs before dependent tests
    const response = await request(app.getHttpServer())
      .post('/chains')
      .set('Content-Type', 'application/json')
      .send({ name: 'New Chain', description: 'Test Chain' })
      .expect(201);

    createdChainId = response.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  // GET all chains
  it('GET /chains - should return all chains', async () => {
    return request(app.getHttpServer())
      .get('/chains')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('name');
      });
  });

  //  POST new chain
  it('POST /chains - should create a new chain', async () => {
    return request(app.getHttpServer())
      .post('/chains')
      .set('Content-Type', 'application/json')
      .send({ name: 'Another Chain', description: 'Another Test Chain' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Another Chain');
      });
  });

  //  POST validation failure
  it('POST /chains - should return 400 if required fields are missing', async () => {
    return request(app.getHttpServer())
      .post('/chains')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(400);
  });

  // GET single chain
  it('GET /chains/:id - should return the correct chain', async () => {
    return request(app.getHttpServer())
      .get(`/chains/${createdChainId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdChainId);
        expect(res.body.name).toBe('New Chain');
      });
  });

  //  GET non-existent chain
  it('GET /chains/:id - should return 404 for non-existent chain', async () => {
    return request(app.getHttpServer()).get('/chains/999').expect(404);
  });

  //  PUT update chain
  it('PUT /chains/:id - should update a chain', async () => {
    return request(app.getHttpServer())
      .put(`/chains/${createdChainId}`)
      .set('Content-Type', 'application/json')
      .send({ name: 'Updated Chain', description: 'Updated Description' })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('Updated Chain');
      });
  });

  //  PUT validation failure
  it('PUT /chains/:id - should return 400 if data is invalid', async () => {
    return request(app.getHttpServer())
      .put(`/chains/${createdChainId}`)
      .set('Content-Type', 'application/json')
      .send({ name: '' }) // Invalid name
      .expect(400);
  });

  // DELETE chain with verification
  it('DELETE /chains/:id - should delete a chain and verify', async () => {
    await request(app.getHttpServer())
      .delete(`/chains/${createdChainId}`)
      .expect(200);

    // Verify deletion
    await request(app.getHttpServer())
      .get(`/chains/${createdChainId}`)
      .expect(404);
  });

  //  DELETE non-existent chain
  it('DELETE /chains/:id - should return 404 for non-existent chain', async () => {
    return request(app.getHttpServer()).delete('/chains/999').expect(404);
  });
});
