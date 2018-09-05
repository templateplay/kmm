'use strict';
const _ = require('lodash'),
	utils = require('../lib/utils'),
	config = utils.parseYml('config');

module.exports = function() {
	return `${config.url}${_.filter(arguments, _.isString).join('/')}.html`.replace(/\/\//g, '\/');
};