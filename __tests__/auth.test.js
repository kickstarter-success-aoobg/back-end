const supertest = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig.js');

describe('Auth Router Tests', () => {
	beforeAll(async () => {
		await db('users').truncate();
	});

	it('register user', async () => {
		const response = await supertest(server)
			.post('/api/auth/register')
			.send({ username: 'Testing', password: 'test' });
		expect(response.status).toBe(201);
	});

	it('user login', async () => {
		const response = await supertest(server)
			.post('/api/auth/login')
			.send({ username: 'Testing', password: 'test' });

		expect(response.status).toBe(200);
		expect(response.body.token).toBeTruthy();
	});
});
