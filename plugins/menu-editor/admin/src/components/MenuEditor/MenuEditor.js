import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ContextProvider } from 'react-sortly';
import { Wrapper, Item } from './Wrapper';
import update from 'immutability-helper';
import useAxios from 'axios-hooks';
import { FormattedMessage } from 'react-intl';
import MySortableTree from './SortableTree';

const exampleMenu = [
  {"id":"1","order":0,"name":"Kontakt","parent_id":0,"menu_id":"1"},
  {"id":"2","order":1,"name":"Pobočky","parent_id":"1","menu_id":"1"},
  {"id":"3","order":0,"name":"Kudy k nám","parent_id":"1","menu_id":"1"}
];

const menuList = [{id:1, title: 'World'}, {id:2, title: 'Hello'}]

export default function MenuEditor ({ modifiedData, onChange}) {
  const [activeMenu, setActiveMenu] = useState(null);

  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    {
      url: 'http://mnovak4:1337/menu-editor/menu',
      method: 'POST'
    },
    { manual: true }
  )

  function updateData() {
    executePost({
      data: {
        title: 'ahoj'
      }
    })
  }

  const changeActiveMenu = useCallback ((e) => {
    setActiveMenu(e.target.value)
    let menuId = menuList.filter(menuItem => menuItem.title === e.target.value)[0].id
    // TODO: do get request with id to fetch details of selected menu
  }, [])

  // const [{ data: sourceData, loading, error }, exe] = useAxios(
  //   'http://localhost:1337/categories'
  // );
  // const addNewMenu = useCallback ((e) => {
  // }, [])



  return (
    <Fragment>
      <FormattedMessage id={'menu-editor.MenuEditor.chooseMenu'}>
        {message => <option value={''}>{message}</option>}
      </FormattedMessage>
      <select onChange={changeActiveMenu}>
        {menuList.map((menuItem) => <option key={menuItem.id} value={menuItem.title}>{menuItem.title}</option>)}
      </select>
      <br />
      <button onClick={updateData}>pridat nove menu</button>
      <div>Vybrane menu je: {activeMenu}</div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <DndProvider backend={HTML5Backend}>
            <ContextProvider>
              <MySortableTree onChange={onChange} currentMenu={activeMenu} modifiedData={modifiedData}/>
            </ContextProvider>
          </DndProvider>
        </div>
      </div>
    </Fragment>
  );
};

