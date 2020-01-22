const Bookshelf = require('bookshelf');

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */
  index: async ctx => {
    // Send 200 `ok`
    ctx.send({
      message: 'ok',
    });
  },
  findOne: async ctx => {
    const { id } = ctx.params
    const Menu = strapi.plugins['menu-editor'].models.source_menu;

    try {
      const sourceMenu = await strapi.plugins['menu-editor'].config
        .queries(Menu)
        .findOne({id});
      
      ctx.body = sourceMenu;
    } catch (error) {
      console.log('getMenusList error:', error);
      ctx.send(
        {
          message: 'error',
          error,
        },
        400
      );
    }
  },
  find: async ctx => {
    const Menu = strapi.plugins['menu-editor'].models.source_menu;

    try {
      const sourceMenu = await strapi.plugins['menu-editor'].config
        .queries(Menu)
        .find();

      ctx.body = sourceMenu.serialize()
    } catch (error) {
      console.log('getMenusList error:', error);
      ctx.send(
        {
          message: 'error',
          error,
        },
        400
      );
    }
  },
  putSourceMenu: async ctx => {
    const menu_items = ctx.request.body
    const SourceMenu = strapi.plugins['menu-editor'].models.source_menu

    try {
      await strapi.plugins['menu-editor'].config
        .queries(SourceMenu)
        .putSourceMenu(menu_items)

      ctx.send(
        {
          message: 'OK',
        },
        201
      );
    } catch (error) {
      console.log('putMenuById error:', JSON.stringify(error));
      ctx.send(
        {
          message: 'error',
          error,
        },
        400
      );
    }
  },
};
