import React, {Fragment} from 'react';
import Sortly, {remove, add} from 'react-sortly';
import { FormattedMessage } from 'react-intl';
import update from 'immutability-helper';
import nanoid from 'nanoid/non-secure';
import SortableMenuItem from './SortableMenuItem';
import styled from 'styled-components';
import { Button } from 'strapi-helper-plugin'
import { useDebounce } from 'use-debounce';
import debounce from 'lodash/debounce';

const ActionsMenu = styled.div`
  display: flex;
`;

const SortlyWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 0 1 700px;
  margin-top: 10px;
`;

export default function SortableMenu ({ menuItems, onChange, editMode }) {

  const handleClickAdd = (e) => {
    e.preventDefault();
    onChange('menuItems', add(menuItems, {
      id: nanoid(12),
      name: '',
    }));
  };

  const handleDelete = (id) => (e) => {
    e.preventDefault();
    const index = menuItems.findIndex(item => item.id === id);
    onChange('menuItems', remove(menuItems, index));
  };

  function deb(name,index,value) {

  }

  const handleChangeRow = (id) => (e) => {
    console.log('ID || E' , id, e.target.value)
    const index = menuItems.findIndex(item => item.id === id);
    const { name, value } = e.target;
    onChange(
      'menuItems',
      update(menuItems, {
        [index]: { [name]: { $set: value }},
      })
    )
  };

  const handleSortly = (newItems) => {
    onChange('menuItems', newItems);
  };

  return (
    <Fragment>
      <ActionsMenu>
        <Button kind="primary" disabled={!editMode} onClick={handleClickAdd}><FormattedMessage id={'menu-editor.MenuEditor.add'} /></Button>
        {/*<Button kind="primary" disabled={!editMode} onClick={location.href="/plugins/content-manager/application::pages.pages/create?redirectUrl=/plugins/menu-editor"}>*/}
        {/*</Button>*/}

        <Button kind="secondary" disabled={!editMode} onClick={handleClickAdd}><FormattedMessage id={'menu-editor.MenuEditor.addNewMenu'} /></Button>
      </ActionsMenu>
      <SortlyWrapper>
        <Sortly
          items={menuItems}
          onChange={handleSortly}
        >
          {(props) => (
            <SortableMenuItem {...{ handleDelete, handleChangeRow }} {...props} editMode={editMode}/>
          )}
        </Sortly>
      </SortlyWrapper>
    </Fragment>
  );
};

