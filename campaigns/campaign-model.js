// const db = require('../database/dbConfig');

// module.exports = {
// 	add,
// 	edit,
// 	remove,
// 	findAll,
// 	findByUserId,
// };

// function findAll() {
// 	return db('campaigns').select(
// 		'name',
// 		'description',
// 		'campaign_length',
// 		'category',
// 		'monetary_goal',
// 		'success_prediction'
// 	);
// }

// function findByUserId(id) {
// 	return db('users')
// 		.join('campaigns', 'users.id', 'campaigns.user_id')
// 		.select(
// 			'campaigns.name',
// 			'campaigns.description',
// 			'campaigns.campaign_length',
// 			'campaigns.category',
// 			'campaigns.monetary_goal',
// 			'campaigns.success_prediction'
// 		)
// 		.where('campaigns.user_id', id);
// }

// async function add(campaign) {
// 	return db('campaigns').insert(campaign, 'id');
// }

// async function remove(campaign_id) {
// 	return db('campaigns').where;
// }
