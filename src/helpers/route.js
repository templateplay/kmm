'use strict';
const _ = require('lodash'),
	yaml = require('js-yaml'),
	fs = require('fs'),
	config = yaml.safeLoad(fs.readFileSync('./src/data/config.yml', 'utf8'));

module.exports = function() {
	return `${config.url}${_.filter(arguments, _.isString).join('/')}`;
};