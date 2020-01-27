import React, {Fragment, useCallback, useState, useEffect} from 'react';
import Sortly, { add, insert } from 'react-sortly';
import { FormattedMessage } from 'react-intl';
import update from 'immutability-helper';
import nanoid from 'nanoid/non-secure';
import SortableMenuItem from './SortableMenuItem';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import { Button } from 'strapi-helper-plugin'
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

export default function SortableMenu ({ menuItems, onChange, editMode, onClickItemDetail }) {
  console.log('MENU ITEMS ' , menuItems)

  // SET URL LOCATION FOR REDIRECT BACK HERE FROM CREATE PAGES
  // const history = useHistory()
  // const myLocation = strapi.router.location.pathname || '/plugins/menu-editor';

  // BUTTON FOR CREATE NEW PAGE
  // const pages = "plugins/content-manager/application::pages.pages";
  // const addNewItem = (e) => {
  //   e.preventDefault()
  //   history.push(`/${pages}/create?redirectUrl=${myLocation}`)
  // }

  // BUTTON FOR CREATE RELATED ITEM IN STRUKTURE
  // const relatedPages = "plugins/content-manager/plugins::menu-editor.source_menu"
  // const addNewRelatedItem = (e) => {
  //   e.preventDefault()
  //   history.push(`/${relatedPages}/create?redirectUrl=${myLocation}`)
  // }

  const handleClickAdd = (e) => {
    // e.preventDefault();
    onChange('menuItems', add(menuItems, {
      id: nanoid(12),
      name: 'Nová položka ' + menuItems.length,
    }));
  };

  const handleChangeRow = (id, value, key) => (e) => {
    console.log("MENU I V HANDLE", id, value, key, e.target.value)
    const index = menuItems.findIndex(item => item.id === id);
    console.log("HANDLE CHANGE ROW--- ID::VALUE::", id, value, index)
    onChange(
      'menuItems',
      update(menuItems, {
        [index]: { [key]: { $set: value }},
      })
    )
  };

  const handleReturn = (id) => {
    const index = menuItems.findIndex(item => item.id === id);
    onChange(
      'menuItems',
      insert(menuItems, {
        id: nanoid(12),
        name: 'Nový záznam ' + menuItems.length,
        isNew: true,
      }, index))
  };

  const handleSortly = useCallback((newItems) => {
    onChange('menuItems', newItems);
  }, [onChange]);

  const handleClickItem = useCallback((newItems) => {
    onChange('menuItems', newItems);
  }, [onChange]);


  return (
    <Fragment>
      <ActionsMenu>
        {/*<Button title={editMode ? 'Add new page' : 'You must be in "Edit mode"'} kind={editMode ? "primary" : "secondary"} disabled={!editMode} onClick={addNewItem}><FormattedMessage id={'menu-editor.MenuEditor.addNewItem'}/></Button>*/}
        {/*<Button kind="primary" disabled={!editMode} onClick={addNewRelatedItem}><FormattedMessage id={'menu-editor.MenuEditor.addNewRelatedItem'} /></Button>*/}
        <Button kind="primary" title={editMode ? 'Add new item in structure' : 'You must be in "Edit mode"'} disabled={!editMode} onClick={handleClickAdd} style={editMode ? {color: 'black', border: '1px solid #0097f6', borderRadius: '5px'} : {color: 'grey'}}><FontAwesomeIcon icon={faPlus}/>Vytvořit položku ve struktuře</Button>
      </ActionsMenu>
      {menuItems ?
        <SortlyWrapper>
          <Sortly
            items={menuItems}
            onChange={handleSortly}
          >
            {(props) => (
              <SortableMenuItem {...{ handleChangeRow, handleReturn, onClickItemDetail }} id={props.data.id} pageId={props.data.page_id} name={props.data.name} depth={props.depth} editMode={editMode}/>
            )}
          </Sortly>
        </SortlyWrapper>:
        <div>loading...</div>}
    </Fragment>
  );
};

