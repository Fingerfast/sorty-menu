import React, {useRef , useCallback} from 'react';
import { DndProvider, createDndContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {add, ContextProvider} from 'react-sortly';
import { FormattedMessage } from 'react-intl';
import SortableMenu from './SortableMenu';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import nanoid from "nanoid/non-secure";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;




export default function MenuEditor ({ onChange, editMode, menuItems}) {
  const clickItemDetail = useCallback((pageId) => (e) => {
    console.log("pageId", pageId, e)
  }, [])
  // const pluginSourceMenus = "plugins/content-manager/plugins::menu-editor.source_menu";

  const history = useHistory()
  const myLocation = strapi.router.location.pathname ? strapi.router.location.pathname : '/plugins/menu-editor';
  const editItem = (pageId) => (e) => {
    const pluginPages = "plugins/content-manager/application::pages.pages";
    e.preventDefault()
    history.push(`/${pluginPages}/${pageId}?redirectUrl=${myLocation}`)
  }

  const manager = useRef(createDndContext(HTML5Backend))

  return (
    <Wrapper>
      <DndProvider manager={manager.current.dragDropManager} backend={HTML5Backend}>
        <ContextProvider>
          <SortableMenu editMode={editMode} onChange={onChange} menuItems={menuItems} onClickItemDetail={clickItemDetail}/>
        </ContextProvider>
      </DndProvider >
    </Wrapper>
  );
};

