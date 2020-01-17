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
  getMenuList: async ctx => {
    const Menu = strapi.plugins['menu-editor'].models.menu;

    try {
      const menusList = await strapi.plugins['menu-editor'].config
        .queries(Menu)
        .getMenuList();

      ctx.body = menusList;
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
  postMenu: async ctx => {
    const { title } = ctx.request.body
    const Menu = strapi.plugins['menu-editor'].models.menu;

    try {
      await strapi.plugins['menu-editor'].config
        .queries(Menu)
        .postMenu({title});

      ctx.send({
        message: 'ok',
      });
    } catch (error) {
      console.log('postMenu error:', error);
      ctx.send(
        {
          message: 'error',
          error,
        },
        400
      );
    }
  },
  getMenuById: async ctx => {
    const { id: menu_id } = ctx.params
    const MenuItem = strapi.plugins['menu-editor'].models.menu_item

    try {
      const menu = await strapi.plugins['menu-editor'].config
        .queries(MenuItem)
        .getMenuById({menu_id})

      ctx.body = menu;
    } catch (error) {
      console.log('getMenuById error:', error);
      ctx.send(
        {
          message: 'error',
          error,
        },
        400
      );
    }
  },
  putMenuById: async ctx => {
    const { id: menu_id } = ctx.params
    const { title, menu_items } = ctx.request.body
    const MenuItem = strapi.plugins['menu-editor'].models.menu_item
    const Menu = strapi.plugins['menu-editor'].models.menu;

    try {
      await strapi.plugins['menu-editor'].config
      .queries([MenuItem, Menu])
      .putMenuById({menu_id, title, menu_items})

      ctx.send({
        message: 'ok',
      });
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
  deleteMenuById: async ctx => {
    const { id: menu_id } = ctx.params
    const MenuItem = strapi.plugins['menu-editor'].models.menu_item
    const Menu = strapi.plugins['menu-editor'].models.menu;

    try {
      await strapi.plugins['menu-editor'].config
      .queries([MenuItem, Menu])
      .deleteMenuById({menu_id})

      ctx.send({
        message: 'ok',
      });
    } catch (error) {
      console.log('deleteMenuById error:', error);
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
