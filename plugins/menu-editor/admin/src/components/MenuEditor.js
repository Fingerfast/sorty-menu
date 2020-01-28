import React, { useCallback, useRef, memo } from 'react';
import { createDndContext, DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ContextProvider } from 'react-sortly';
import SortableMenu from './SortableMenu';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import nanoid from 'nanoid/non-secure';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function createNewItem(items) {
  return {
    id: nanoid(12),
    name: 'Nová položka ' + items.length,
    isNew: true
  };
}

export default memo(function MenuEditor({ onChange, editMode, menuItems }) {
  // console.log("MENU EDITOR RERENDER---",)
  // const pluginSourceMenus = "plugins/content-manager/plugins::menu-editor.source_menu";

  const history = useHistory();
  const location = strapi.router.location.pathname ? strapi.router.location.pathname : '/plugins/menu-editor';
  const pluginPages = 'plugins/content-manager/application::pages.pages';

  const handleChange = useCallback((items) => {
    onChange('menuItems', items);
  }, [onChange]);

  const handleItemClick = useCallback((item) => {
    history.push(`/${pluginPages}/${item.page_id}?redirectUrl=${location}`);
  }, [onChange]);

  const manager = useRef(createDndContext(HTML5Backend));

  function focusRef(ref) {
    ref.focus()
  }

  return (
    <Wrapper>
      {menuItems.length > 0 ?
        <DndProvider manager={manager.current.dragDropManager} backend={HTML5Backend}>
          <ContextProvider>
            <SortableMenu
              itemCreator={createNewItem}
              editMode={editMode}
              items={menuItems}
              onChange={handleChange}
              onItemClick={handleItemClick}
              focusRef={focusRef}
            />
          </ContextProvider>
        </DndProvider>
        : <div>Loading...</div>
      }
    </Wrapper>
  );
});