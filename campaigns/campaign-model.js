const db = require('../database/dbConfig');

module.exports = {
	getByUserID,
	getByCampaignID,
	addCampaign,
	editCampaign,
	removeCampaign,
};

function getByUserID(id) {
	return db('campaigns').where({
		user_id: id,
	});
}

function getByCampaignID(id) {
	return db('campaigns')
		.where({ id: Number(id) })
		.first();
}

function addCampaign(newCampaign) {
	return db('campaigns').returning('id').insert(newCampaign);
}

function editCampaign(id, object) {
	return db('campaigns').where({ id: id }).returning('id').update(object);
}

function removeCampaign(id) {
	return db('campaigns').where({ id: id }).returning('id').del();
}
