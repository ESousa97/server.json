jest.mock('../src/db/client', () => ({
  query: jest.fn(async () => ({ rows: [{ id: 1, ok: true }] })),
}));

jest.mock('../src/db/queries', () => ({
  getQuery: jest.fn(() => 'SELECT 1'),
}));

const request = require('supertest');
const app = require('../api/index');

describe('API', () => {
  describe('Health check', () => {
    test('GET / responds with health payload', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('endpoints');
    });
  });

  describe('Security headers', () => {
    test('includes security headers in response', async () => {
      const res = await request(app).get('/api/cards');
      expect(res.headers['x-content-type-options']).toBe('nosniff');
      expect(res.headers['x-frame-options']).toBe('DENY');
      expect(res.headers['x-xss-protection']).toBe('1; mode=block');
    });
  });

  describe('/api/cards', () => {
    test('GET returns mocked rows', async () => {
      const res = await request(app).get('/api/cards');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toEqual({ id: 1, ok: true });
    });

    test('POST returns 405', async () => {
      const res = await request(app).post('/api/cards');
      expect(res.status).toBe(405);
      expect(res.body).toHaveProperty('error.code', 'METHOD_NOT_ALLOWED');
    });

    test('OPTIONS returns 2xx (CORS preflight)', async () => {
      const res = await request(app).options('/api/cards');
      expect(res.status).toBeGreaterThanOrEqual(200);
      expect(res.status).toBeLessThan(300);
    });
  });

  describe('/api/categories', () => {
    test('GET returns mocked rows', async () => {
      const res = await request(app).get('/api/categories');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('/api/procedure', () => {
    test('GET without id returns 400', async () => {
      const res = await request(app).get('/api/procedure');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error.code', 'BAD_REQUEST');
    });

    test('GET with id returns mocked row', async () => {
      const res = await request(app).get('/api/procedure?id=1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, ok: true });
    });

    test('GET /api/procedure/:id also works', async () => {
      const res = await request(app).get('/api/procedure/1');
      expect(res.status).toBe(200);
    });
  });

  describe('/api/search', () => {
    test('GET without query returns 400', async () => {
      const res = await request(app).get('/api/search');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error.code', 'BAD_REQUEST');
    });

    test('GET with query returns mocked rows', async () => {
      const res = await request(app).get('/api/search?query=test');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
