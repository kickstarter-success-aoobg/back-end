const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/restricted-middleware');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const campaignsRouter = require('../campaigns/campaign-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/campaigns', campaignsRouter);

server.get('/', (req, res) => {
	res.status(200).json({ api: 'its alive!' });
});

module.exports = server;
