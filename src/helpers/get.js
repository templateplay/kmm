'use strict';
const _ = require('lodash'),
	utils = require('../lib/utils'),
	data = utils.parseYml('data'),
	slug = utils.slug;

module.exports = function(type, name) {
	var obj = _.find(data[type], (c) => {
		return slug(c.name) === name;
	});
	if (obj) {
		if (obj.images) {
			obj.images = _.map(obj.images, (e) => {
				return `${config.url}${e}`;
			});
			root.meta.images = obj.images;
		}
	}
	return obj;
};