const bookshelf = require('bookshelf');

module.exports = model => ({
  getMenuList: async () => await model.fetchAll(),
  postMenu: async ({title}) => await model.forge().save({title}),
  getMenuById: async ({menu_id}) => await model.where({menu_id}).fetchAll(),
  deleteMenuById: async ({menu_id}) => {
    const Bookshelf = new bookshelf(strapi.connections.default);
    const [MenuItem, Menu] = model

    return await Bookshelf.transaction(async t => {
      try {
        await Menu.where({id: menu_id}).destroy({transacting: t})
        await MenuItem.where({menu_id}).destroy({transacting: t})

        return
      } catch (error) {
        console.log('error', error);
      }
    });
  },
  putMenuById: async ({menu_id, title, menu_items}) => {
    const Bookshelf = new bookshelf(strapi.connections.default);

    return await Bookshelf.knex.transaction(async trx => {
      try {
        await Bookshelf.knex('menu-editor_menu')
          .transacting(trx)
          .where({ id: menu_id })
          .update({title});

        await Bookshelf.knex('menu-editor_menu_item')
         .transacting(trx)
         .where({ menu_id })
         .del();

        await Bookshelf.knex('menu-editor_menu_item')
          .transacting(trx)
          .insert(menu_items);

        await trx.commit;

        return
      } catch (error) {
        console.log('error', error);
        await trx.rollback;
      }
    });
  },
});
