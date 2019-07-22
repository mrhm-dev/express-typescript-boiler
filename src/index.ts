import dotenv from 'dotenv';
import http from 'http';
import { connect } from 'mongoose'
import config from 'config'

import app from './app';
import logger from './logger/logger'

// Configuring Dotenv
dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

(async function () {
	await connect(config.get('mongo_uri'), {useNewUrlParser: true})
	logger.info('Database Connected')
	
	server.listen(PORT, () => {
		logger.info(`Server is Running on Port - ${PORT}`)
	})
})()