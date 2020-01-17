import React, {useState, useEffect, useCallback} from 'react';
import Sortly, {remove, add, convert} from 'react-sortly';
import nanoid from 'nanoid/non-secure';
import { FormattedMessage } from 'react-intl';
import SortableTreeItem from './SortableTreeItem';
import useAxios from "axios-hooks";

const exampleMenu = [
  {"id":"1","order":0,"name":"Kontakt","parent_id":0,"menu_id":"1"},
  {"id":"2","order":1,"name":"Pobočky","parent_id":"1","menu_id":"1"},
  {"id":"3","order":0,"name":"Kudy k nám","parent_id":"1","menu_id":"1"}
];
const remapSortlyInput = databaseOutput => {
  return databaseOutput.map(row => {
    const {
      id,
      parent_id = null,
      menu_id,
      order,
      title,
    } = row;

    return {
      id,
      index: order,
      name: title,
    };
  });
};

function convertData(data) {
  const sortlyData = convert(remapSortlyInput(data));
  return sortlyData;
}

export default function SortableMenu ({ onChange, menuId }) {
  const [{ data: menuData, loading: menuDataLoading, error: menuDataError }, setMenuData] = useAxios(
    //TODO: Put ID to fetch details about this menu
    `http://localhost:1337/menu-editor/menu/${menuId}`
  )
  const [sortlyData, setSortlyData] = useState([])
  console.log('MENU ID' , menuId)
  console.log('MENU DATA' , menuData)

  useEffect(() => {
    menuData && setSortlyData(convert(remapSortlyInput(menuData)))
  }, [menuDataLoading])
  console.log('sortlyData' , sortlyData)

  const handleChangeRow = (id, target) => {
    const index = menuData.findIndex(item => item.id === id);
    console.log('index' , id.target.value, target, index)
    // const { name, value } = target;
    // onChange(
    //   'menuData',
    //   update(menuData, {
    //     [index]: { [name]: { $set: value } },
    //   })
    // );
  };

  const handleDelete = id => {
    const index = menuData.findIndex(item => item.id === id);
    onChange('menuData', remove(menuData, index));
  };

  const handleClickAdd = useCallback((data) => (e) => {
    e.preventDefault()
    console.log('aaaa', data)
    setSortlyData(add(data, {name: ''}))
  },[]);

  const handleSortly = (newItems) => {
    console.log('NEW ITEM::' , newItems)
    setMenuData(newItems);
  }
  if (menuDataLoading) return <p>Loading...</p>
  if (menuDataError) return <p>Error!</p>
  return (
    <>
      <div className="row">
        <Sortly
          items={sortlyData || []}
          name={menuData && menuData.title}
          // onChange={setSortly}
          onChange={handleSortly}
        >
          {props => (
            <SortableTreeItem {...{ handleDelete, handleChangeRow }} {...props} />
          )}
        </Sortly>
      </div>
      <div className="row">
        <button kind="secondary" onClick={handleClickAdd(sortlyData)}>
          <FormattedMessage id={'menu-editor.MenuEditor.add'} />
        </button>
      </div>
    </>
  );
};

