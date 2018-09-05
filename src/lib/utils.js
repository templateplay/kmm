'use strict';
const _ = require('lodash'),
	yaml = require('js-yaml'),
	fs = require('fs'),
	slug = require('speakingurl');

module.exports = {
	parseYml: function(name) {
		return yaml.safeLoad(fs.readFileSync(`./src/data/${name}.yml`, 'utf8'));
	},
	slug: slug
};