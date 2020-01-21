import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ContextProvider } from 'react-sortly';
import { FormattedMessage } from 'react-intl';
import SortableMenu from './SortableMenu';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function MenuEditor ({ onChange, editMode, menuItems}) {

  return (
    <Wrapper>
      <DndProvider backend={HTML5Backend}>
        <ContextProvider>
          <SortableMenu editMode={editMode} onChange={onChange} menuItems={menuItems}/>
        </ContextProvider>
      </DndProvider>
    </Wrapper>
  );
};

