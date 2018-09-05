'use strict';
const slug = require('speakingurl');

module.exports = function(e) {
	return slug(e);
};