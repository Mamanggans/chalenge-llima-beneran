
const request = require('supertest');
const app = require('../controller/user.controller'); // Import your app

describe('User Controller', () => {
  describe('POST /user', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/user')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          identity_type: 'ID',
          identity_number: '1234567890',
          address: '123 Test St',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', 'success');
    });
  });

  describe('GET /user', () => {
    it('should get all users', async () => {
      const res = await request(app)
        .get('/user');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', 'success');
    });
  });

  describe('GET /user/:id', () => {
    it('should retrieve a user by id', async () => {
      const res = await request(app)
        .get('/user/1');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', 'success');
    });
  });

  describe('PUT /user/:id', () => {
    it('should update a user by id', async () => {
      const res = await request(app)
        .put('/user/1')
        .send({
          name: 'Updated User',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', 'success');
    });
  });
});