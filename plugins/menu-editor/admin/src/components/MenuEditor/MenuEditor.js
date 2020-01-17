import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ContextProvider } from 'react-sortly';
import { Wrapper, Item } from './Wrapper';
import update from 'immutability-helper';
import useAxios from 'axios-hooks';
import { FormattedMessage } from 'react-intl';
import SortableMenu from './SortableMenu';



const menuList = [{id:1, title: 'World'}, {id:2, title: 'Hello'}]

export default function MenuEditor ({ MenuIds, onChange}) {
  const [{ data: getData, loading: getLoading, error: getError }] = useAxios(
    //TODO: Put URL to fetch menuList for select correct menu === ${menuList}
    'https://api.myjson.com/bins/820fc'
  )
  console.log('GET MENU LIST::' , getData)
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {

  }, [])

  const [
    { data: postData, loading: postLoading, error: postError },executePost] = useAxios(
    {
      url: 'http://mnovak4:1337/menu-editor/menu',
      method: 'POST'
    },
    { manual: true }
  )

  // function updateData(title) {
  //   executePost({
  //     data: {
  //       title: 'ahoj'
  //     }
  //   })
  // }

  const updateData = useCallback ((title) => {
    executePost({
      data: {
        title: title,
      }
    })
    // TODO: do POST request with title
  }, [])

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
      <button>pridat nove menu</button>
      <div>Vybrane menu je: {activeMenu && activeMenu.name}</div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <DndProvider backend={HTML5Backend}>
            <ContextProvider>
              <SortableMenu onChange={onChange} menuId={activeMenu && activeMenu.id}/>
            </ContextProvider>
          </DndProvider>
        </div>
      </div>
    </Fragment>
  );
};

