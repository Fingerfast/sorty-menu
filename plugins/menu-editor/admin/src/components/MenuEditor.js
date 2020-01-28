import React, { useCallback, useRef, useState, useEffect } from 'react';
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

export default function MenuEditor(props) {
  const { onChange, editMode, menuItems } = props
  useWhyDidYouUpdate('MenuEditor', props);
  // const pluginSourceMenus = "plugins/content-manager/plugins::menu-editor.source_menu";
  console.log('huuu', menuItems)

  const history = useHistory();
  const location = strapi.router.location.pathname ? strapi.router.location.pathname : '/plugins/menu-editor';
  const pluginPages = 'plugins/content-manager/application::pages.pages';

  //const handleChange = useCallback((items) => {
  //  onChange('menuItems', items);
  //}, [onChange]);

  const handleItemClick = useCallback((item) => {
    history.push(`/${pluginPages}/${item.page_id}?redirectUrl=${location}`);
  }, [onChange]);

  const manager = useRef(createDndContext(HTML5Backend));

  return (
    <Wrapper>
      <DndProvider manager={manager.current.dragDropManager} backend={HTML5Backend}>
        <ContextProvider>
          <SortableMenu
            itemCreator={createNewItem}
            editMode={editMode}
            items={menuItems}
            onChange={onChange}
            onItemClick={handleItemClick}
          />
        </ContextProvider>
      </DndProvider>
    </Wrapper>
  );
};

// Hook
function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}

