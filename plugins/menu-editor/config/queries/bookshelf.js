const bookshelf = require('bookshelf');

module.exports = model => ({
  findOne: async ({id}) => await model.forge({id}).fetch(),
  find: async () => await model.fetchAll(),
  //postSourceMenu: async (menu_items) => {
  //  const Bookshelf = new bookshelf(strapi.connections.default);
  //  //TODO catch errors
  //  return await Bookshelf.knex.transaction(async trx => {
  //    try {
  //      await Bookshelf.knex('menu-editor_source_menu')
  //        .transacting(trx)
  //        .del();

  //      await Bookshelf.knex('menu-editor_source_menu')
  //        .transacting(trx)
  //        .insert(menu_items);

  //      await trx.commit;
  //    } catch (error) {
  //      await trx.rollback;
  //    }
  //  });
  //},
});
