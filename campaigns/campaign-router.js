const express = require('express');
// database access using knex
const db = require('../database/dbConfig.js');
const router = express.Router();

router.get('/users/:id', async (req, res) => {
	try {
		const allCampaigns = await db('campaigns').where({
			user_id: req.params.id,
		});
		if (allCampaigns.length) {
			res.status(200).json(allCampaigns);
		} else {
			res
				.status(404)
				.json({ message: 'This user does not have any campaigns' });
		}
	} catch (err) {
		res
			.status(500)
			.json({ err: err.message, message: 'Cannot fetch campaigns' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const foundCampaign = await db('campaigns')
			.where({ id: Number(req.params.id) })
			.first();
		if (foundCampaign) {
			res.status(200).json(foundCampaign);
		} else {
			res.status(404).json({ message: 'No campaign by that id' });
		}
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Cannot find this campaign', err: err.message });
	}
});

router.post('/', async (req, res) => {
	const post = req.body;
	const campaignObj = {
		...post,
	};

	if (isValid(post)) {
		try {
			const [newCampaignId] = await db('campaigns')
				.returning('id')
				.insert(campaignObj);
			if (newCampaignId) {
				const newCampaign = await db('campaigns').where({ id: newCampaignId });
				if (newCampaign) {
					res.status(201).json(newCampaign);
				} else {
					res.status(400).json({
						message: 'Could not create new campaign, please try again',
					});
				}
			} else {
				res
					.status(400)
					.json({ message: 'Could not create new campaign, please try again' });
			}
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	} else {
		res.status(400).json({
			message:
				'Please include campaign name, description, campaign length, category, monetary goal and success prediction',
		});
	}
});

router.put('/:id', async (req, res) => {
	const campaignId = Number(req.params.id);
	// const userId = Number(req.user.id);

	const post = req.body;

	const campaignObj = {
		...post,
	};

	if (isValid(post)) {
		try {
			const [foundCampaign] = await db('campaigns').where({ id: campaignId });
			if (!foundCampaign) {
				return res
					.status(404)
					.json({ message: 'No campaign found with that id' });
			}
			if (Number(foundCampaign.id)) {
				const updatedCampaignId = await db('campaigns')
					.where({ id: campaignId })
					.returning('id')
					.update(campaignObj);
				if (updatedCampaignId) {
					const updatedCampaign = await db('campaigns').where({
						id: updatedCampaignId,
					});
					if (updatedCampaign) {
						res
							.status(200)
							.json({ id: updatedCampaign.id, message: 'updated campaign' });
					} else {
						res
							.status(400)
							.json({ message: 'Could not update campaign, please try again' });
					}
				} else {
					res
						.status(400)
						.json({ message: 'Could not update campaign, please try again' });
				}
			}
		} catch (err) {
			res
				.status(500)
				.json({ message: 'Something went wrong, try again', err: err.message });
		}
	} else {
		res.status(400).json({
			message:
				'Please include campaign name, description, campaign length, category, monetary goal and success prediction',
		});
	}
});

router.delete('/:id', async (req, res) => {
	const campaignId = Number(req.params.id);

	try {
		const [foundCampaign] = await db('campaigns').where({ id: campaignId });
		if (!foundCampaign) {
			return res
				.status(404)
				.json({ message: 'No campaign found with that id' });
		}
		if (Number(foundCampaign.id)) {
			const deletedCampaign = await db('campaigns')
				.where({ id: campaignId })
				.returning('id')
				.del();
			if (deletedCampaign) {
				res.status(200).json({ message: `Campaign deleted` });
			} else {
				res
					.status(404)
					.json({ message: 'campaign not found with that ID in statement' });
			}
		} else res.status(404).json({ message: 'campaign not found with that ID' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

function isValid(post) {
	return Boolean(
		post.name &&
			post.description &&
			post.campaign_length &&
			post.category &&
			post.success_prediction
	);
}

module.exports = router;
