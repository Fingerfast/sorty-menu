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
        await Promise.all([
          MenuItem.where({menu_id}).destroy({transacting: t}),
          Menu.where({id: menu_id}).destroy({transacting: t})])

        return
      } catch (error) {
        console.log('error', error);
      }
    });
  },
  putMenuById: async ({menu_id, title, menu_items}) => {
    const Bookshelf = new bookshelf(strapi.connections.default);
    //TODO catch errors
    return await Bookshelf.knex.transaction(async trx => {
      try {
        const menuExists = await Bookshelf.knex('menu-editor_menu')
          .transacting(trx)
          .where({ id: menu_id })

        if (menuExists.length > 0) {
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
        } else {
          throw new Error("Menu with this ID doesn't exists");
        }
      } catch (error) {
        await trx.rollback;
      }
    });
  },
});
