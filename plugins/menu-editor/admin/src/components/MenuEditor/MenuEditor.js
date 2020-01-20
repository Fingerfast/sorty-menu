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
const Title = styled.h2`
  padding: 10px;
  color: #333740;
`;

export default function MenuEditor ({ onChange, editMode, menuItems, modifiedData}) {

  return (
    <Wrapper>
      <FormattedMessage id={'menu-editor.MenuEditor.chooseMenu'}>
        {message => (<Title value={'TITLE MENU'}/>)}
      </FormattedMessage>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <DndProvider backend={HTML5Backend}>
            <ContextProvider>
              <SortableMenu editMode={editMode} onChange={onChange} menuItems={menuItems} modifiedData={modifiedData}/>
            </ContextProvider>
          </DndProvider>
        </div>
      </div>
    </Wrapper>
  );
};

