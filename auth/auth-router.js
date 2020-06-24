const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();
const Users = require('../users/model');

const { isValid } = require('../users/users-service');

const constants = require('../config/constants');

router.post('/register', (req, res) => {
	const credentials = req.body;
	const hash_rounds = process.env.HASH_ROUNDS || 10;
	const hash = bcryptjs.hashSync(credentials.password, hash_rounds);

	credentials.password = hash;

	Users.add(credentials)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			console.log('Error adding user', err);
		});
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (isValid(req.body)) {
		Users.findBy({ username: username })
			.then(([user]) => {
				// compare the password the hash stored in the database
				console.log('user', user);
				if (user && bcryptjs.compareSync(password, user.password)) {
					const token = createToken(user);

					res.status(200).json({ token: token, message: 'Welcome to our API' });
				} else {
					res.status(401).json({ message: 'Invalid credentials' });
				}
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
			});
	} else {
		res.status(400).json({
			message:
				'please provide username and password and the password should be alphanumeric',
		});
	}
});

function createToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
	};
	const secret = constants.jwtSecret;
	const options = {
		expiresIn: '1d',
	};
	return jwt.sign(payload, secret, options);
}

module.exports = router;
