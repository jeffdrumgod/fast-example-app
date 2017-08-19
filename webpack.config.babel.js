import fs from 'fs-extra';

const TARGET = process.env.npm_lifecycle_event;

let config = {};

switch (TARGET) {
	case 'start':
		config = require('./config/webpack/dev.js');
		break;
	case 'build':
		config = require('./config/webpack/prd.js');
		break;
}

export default config;
