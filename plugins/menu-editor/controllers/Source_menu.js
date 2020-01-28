const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const Bookshelf = require('bookshelf');

module.exports = {
  index: async ctx => {
  },
  find: async ctx => {
    ctx.body = await strapi.controllers.pages.find(ctx)
  },
  findOne: async ctx => {
    ctx.body = await strapi.controllers.pages.findOne(ctx)
  },
  editMany: async ctx => {
    ctx.body = await strapi.controllers.pages.updateMany(ctx)
  },
};
