'use strict';
const _ = require('lodash'),
    utils = require('../lib/utils'),
    data = utils.parseYml('data'),
    config = utils.parseYml('config'),
    slug = utils.slug;

module.exports = function(root) {
    var page = root.page;
    if (page === 'index')
        return;
    _.assign(root, {
        category: _.find(data.category, (c) => {
            return slug(c.name) === page;
        }),
        product: _(data.category).map('products').flatten().find((p) => {
            return slug(p.name) === page;
        }),
        articleCategory: _.find(data.articleCategory, (c) => {
            return slug(c.name) === page;
        }),
        article: _(data.articleCategory).map('articles').flatten().find((p) => {
            return slug(p.name) === page;
        })
    });
    var obj = root.category || root.product || root.articleCategory || root.article;
    if (obj) {
        if (obj.images) {
            root.meta.images = _.map(obj.images, (e) => {
                return `${config.url}${e}`;
            });
        }
        if (obj.url) {
            root.meta.url = `${config.url}/${obj.url}`;
        }
    }
};