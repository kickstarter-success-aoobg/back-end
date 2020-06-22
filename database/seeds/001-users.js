exports.seed = function (knex) {
	return knex('users')
		.del()
		.then(function () {
			return knex('users').insert([
				{ id: 1, username: 'name1', password: 'test' },
				{ id: 2, username: 'name2', password: 'test' },
				{ id: 3, username: 'name3', password: 'test' },
			]);
		});
};
