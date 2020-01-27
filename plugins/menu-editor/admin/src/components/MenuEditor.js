import React, {useRef , useCallback} from 'react';
import { DndProvider, createDndContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {add, ContextProvider, insert} from 'react-sortly';
import { FormattedMessage } from 'react-intl';
import SortableMenu from './SortableMenu';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import nanoid from "nanoid/non-secure";
import update from "immutability-helper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function MenuEditor ({ onChange, editMode, menuItems}) {
  const manager = useRef(createDndContext(HTML5Backend))
  const history = useHistory()
  const myLocation = strapi.router.location.pathname ? strapi.router.location.pathname : '/plugins/menu-editor';

  const onClickItemDetail = (pageId) => (e) => {
    const pluginPages = "plugins/content-manager/application::pages.pages";
    e.preventDefault()
    history.push(`/${pluginPages}/${pageId}?redirectUrl=${myLocation}`)
  }

  const onItemAdd = useCallback((e) => {
    console.log("ON ITEM ADD---")
    e.preventDefault();
    onChange('menuItems', add(menuItems, {
      id: nanoid(12),
      name: 'Nová položka ' + menuItems.length,
    }));
  }, [onChange, menuItems]);

  const onItemEdit = useCallback((id, key) => (e) =>{
    const index = menuItems.findIndex(item => item.id === id);
    const {name, value} = e.target
    console.log("ON ITEM EDIT--- ID::VALUE::", id , value)

    onChange(
      'menuItems',
      update(menuItems, {
        [index]: { [key]: { $set: value }},
      })
    )
  }, [onChange, menuItems]);

  const onItemMove = useCallback((newItems) => {
    onChange('menuItems', newItems);
  }, [onChange]);

  const onPressEnter = (id) => {
    const index = menuItems.findIndex(item => item.id === id);
    onChange(
      'menuItems',
      insert(menuItems, {
        id: nanoid(12),
        name: 'Nový záznam ' + menuItems.length,
        isNew: true,
      }, index))
  };

  return (
    <Wrapper>
      <DndProvider manager={manager.current.dragDropManager} backend={HTML5Backend}>
        <ContextProvider>
          <SortableMenu editMode={editMode} {... {onItemEdit, onItemMove, onItemAdd, onPressEnter, onClickItemDetail}} menuItems={menuItems} />
        </ContextProvider>
      </DndProvider >
    </Wrapper>
  );
};

