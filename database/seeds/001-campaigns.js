exports.seed = function (knex) {
	return knex('campaigns')
		.del()
		.then(function () {
			return knex('campaigns').insert([
				{
					id: 1,
					user_id: 1,
					name: 'KickStarter Project 1',
					description: 'Sample Description',
					campaign_length: 45,
					category: 'Technology',
					monetary_goal: 150000,
					success_prediction: 75,
				},
				{
					id: 2,
					user_id: 2,
					name: 'KickStarter Project 2',
					description: 'Sample Description',
					campaign_length: 60,
					category: 'Technology',
					monetary_goal: 20000,
					success_prediction: 40,
				},
				{
					id: 3,
					user_id: 3,
					name: 'KickStarter Project 3',
					description: 'Sample Description',
					campaign_length: 20,
					category: 'Technology',
					monetary_goal: 50000,
					success_prediction: 90,
				},
				{
					id: 4,
					user_id: 1,
					name: 'KickStarter Project 4',
					description: 'Sample Description',
					campaign_length: 50,
					category: 'Technology',
					monetary_goal: 100000,
					success_prediction: 75,
				},
			]);
		});
};
