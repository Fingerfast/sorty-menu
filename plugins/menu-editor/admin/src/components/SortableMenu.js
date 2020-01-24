import React, {Fragment, useCallback} from 'react';
import Sortly, {remove, add} from 'react-sortly';
import { FormattedMessage } from 'react-intl';
import update from 'immutability-helper';
import nanoid from 'nanoid/non-secure';
import SortableMenuItem from './SortableMenuItem';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import { Button } from 'strapi-helper-plugin'
import { useDebounce } from 'use-debounce';
import debounce from 'lodash/debounce';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const ActionsMenu = styled.div`
  display: flex;
  > button {
    > svg {
      font-size: 1.4em;
    }
  }
`;

const SortlyWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 0 1 700px;
  margin-top: 10px;
`;

export default function SortableMenu ({ menuItems, onChange, editMode }) {
  console.log('MENU ITEMS ' , menuItems, strapi.router.location)

  const history = useHistory()
  const pages = "plugins/content-manager/application::pages.pages";
  const relatedPages = "plugins/content-manager/plugins::menu-editor.source_menu"
  const myLocation = strapi.router.location.pathname ? strapi.router.location.pathname : '/plugins/menu-editor';
  const addNewItem = (e) => {
    e.preventDefault()
    history.push(`/${pages}/create?redirectUrl=${myLocation}`)
  }
  const addNewRelatedItem = (e) => {
    e.preventDefault()
    history.push(`/${relatedPages}/create?redirectUrl=${myLocation}`)
  }
  const handleClickAdd = (e) => {
    e.preventDefault();
    onChange('menuItems', add(menuItems, {
      id: nanoid(12),
      name: 'Nová položka ' + menuItems.length,
    }));
  };

  const handleDelete = (id) => (e) => {
    e.preventDefault();
    const index = menuItems.findIndex(item => item.id === id);
    onChange('menuItems', remove(menuItems, index));
  };

  // const handleChangeRow = (id) => (e) => {
  //   const index = menuItems.findIndex(item => item.id === id);
  //   const { name, value } = e.target;
  //   onChange(
  //     'menuItems',
  //     update(menuItems, {
  //       [index]: { [name]: { $set: value }},
  //     })
  //   )
  // };

  const handleChangeRow = useCallback(() => {

  }, [])

  const handleSortly = (newItems) => {
    onChange('menuItems', newItems);
  };

  return (
    <Fragment>
      <ActionsMenu>
        {/*<Button title={editMode ? 'Add new page' : 'You must be in "Edit mode"'} kind={editMode ? "primary" : "secondary"} disabled={!editMode} onClick={addNewItem}><FormattedMessage id={'menu-editor.MenuEditor.addNewItem'}/></Button>*/}
        {/*<Button kind="primary" disabled={!editMode} onClick={addNewRelatedItem}><FormattedMessage id={'menu-editor.MenuEditor.addNewRelatedItem'} /></Button>*/}
        {/*<Button kind="primary" disabled={!editMode} onClick={location.href="/plugins/content-manager/application::pages.pages/create?redirectUrl=/plugins/menu-editor"}>*/}
        {/*</Button>*/}

        {/*<Button kind="secondary" disabled={!editMode} onClick={handleClickAdd}><FormattedMessage id={'menu-editor.MenuEditor.addNewMenu'} /></Button>*/}
        <Button title={editMode ? 'Add new item in structure' : 'You must be in "Edit mode"'} disabled={!editMode} onClick={handleClickAdd} style={editMode ? {color: 'black', border: '1px solid #0097f6', borderRadius: '5px'} : {color: 'grey'}}><FontAwesomeIcon icon={faPlus}/>Vytvořit položku ve struktuře</Button>
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

