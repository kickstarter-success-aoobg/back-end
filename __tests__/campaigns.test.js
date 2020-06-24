const supertest = require('supertest');
const server = require('../api/server');

const db = require('../database/dbConfig.js');

describe('Campaign Router Tests', () => {
	beforeAll(async () => {
		await db('campaigns').truncate();
	});

	it('Creates New Campaign', async () => {
		let response = await supertest(server).post('/api/campaigns/').send({
			user_id: '1',
			name: 'KickStarter Post 11',
			description: 'Description',
			campaign_length: '85',
			category: 'Dance',
			monetary_goal: 5000,
			success_prediction: '90',
		});
		expect(response.status).toBe(201);
	});

	describe('Get Campaigns By User ID', () => {
		it('Returns 404 If No Campaigns Exist For User', () => {
			return supertest(server)
				.get('/api/campaigns/users/5')
				.then((response) => {
					// jest assertion
					expect(response.status).toBe(404);
				});
		});

		it('Returns Correct Message If No Campaigns Exist For User', () => {
			return supertest(server)
				.get('/api/campaigns/users/5')
				.then((res) => {
					// jest assertion
					expect(res.body.message).toEqual(
						'This user does not have any campaigns'
					);
				});
		});

		it('Returns 200 If Campaign(s) Exist For User', () => {
			return supertest(server)
				.get('/api/campaigns/users/1')
				.then((response) => {
					// jest assertion
					expect(response.status).toBe(200);
				});
		});

		it('Returns JSON Object', () => {
			return supertest(server)
				.get('/api/campaigns/users/1')
				.then((response) => {
					// jest assertion
					expect(response.type).toMatch(/json/i);
				});
		});
	});

	describe('Get By Campaign ID', () => {
		it('Returns 200 If Campaign Exists', () => {
			return supertest(server)
				.get('/api/campaigns/1')
				.then((response) => {
					expect(response.status).toBe(200);
				});
		});

		it('Returns JSON Object', () => {
			return supertest(server)
				.get('/api/campaigns/1')
				.then((response) => {
					expect(response.type).toMatch(/json/i);
				});
		});

		it('Returns 404 If Campaign Does Not Exist', () => {
			return supertest(server)
				.get('/api/campaigns/5')
				.then((response) => {
					expect(response.status).toBe(404);
				});
		});
	});

	describe('put /:id', () => {
		it('should update campaign', async () => {
			let response = await supertest(server).put('/api/campaigns/1').send({
				user_id: 99,
				name: 'KickStarter Edit 12',
				description: 'Description',
				campaign_length: 85,
				category: 'Dance',
				monetary_goal: 5000,
				success_prediction: 90,
			});
			expect(response.status).toBe(200);
		});
	});

	describe('delete /:id', () => {
		it('should delete campaign', async () => {
			const response = await supertest(server)
				.del('/api/campaigns/1')
				.send({ id: 1 });

			expect(response.status).toBe(200);
		});

		it('should return 404 if campaign does not exist', async () => {
			const response = await supertest(server)
				.del('/api/campaigns/500')
				.send({ id: 500 });
			expect(response.status).toBe(404);
		});
	});
});
