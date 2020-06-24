exports.seed = function (knex) {
	return knex('users')
		.del()
		.then(function () {
			return knex('users').insert([
				{ id: 99, username: 'name1', password: 'test' },
				{ id: 100, username: 'name2', password: 'test' },
				{ id: 101, username: 'name3', password: 'test' },
			]);
		});
};
