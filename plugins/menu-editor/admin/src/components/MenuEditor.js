import React, {useRef} from 'react';
import { DndProvider, createDndContext } from 'react-dnd';
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
  const manager = useRef(createDndContext(HTML5Backend))

  return (
    <Wrapper>
      <DndProvider manager={manager.current.dragDropManager} backend={HTML5Backend}>
        <ContextProvider>
          <SortableMenu editMode={editMode} onChange={onChange} menuItems={menuItems}/>
        </ContextProvider>
      </DndProvider >
    </Wrapper>
  );
};

