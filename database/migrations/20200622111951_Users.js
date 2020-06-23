exports.up = function (knex) {
	return knex.schema
		.createTable('users', (user) => {
			user.increments();

			user.string('username').notNullable().unique();

			user.string('password').notNullable();
		})

		.createTable('campaigns', (campaign) => {
			campaign.increments();

			campaign
				.integer('user_id')
				.notNullable()
				.references('id')
				.inTable('users');

			campaign.string('name').notNullable();

			campaign.string('description').notNullable();

			campaign.integer('campaign_length').notNullable();

			campaign.string('category').notNullable();

			campaign.integer('monetary_goal').notNullable();

			campaign.integer('success_prediction').notNullable();
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('users').dropTableIfExists('campaigns');
};
