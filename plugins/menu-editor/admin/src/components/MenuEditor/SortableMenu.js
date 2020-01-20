import React, {useState, useEffect, useCallback} from 'react';
import Sortly, {remove, add, convert} from 'react-sortly';
import { FormattedMessage } from 'react-intl';
import update from 'immutability-helper';
import SortableTreeItem from './SortableTreeItem';
import useAxios from "axios-hooks";

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

export default function SortableMenu ({ onChange, menuId, editMode }) {
  // const [{ data: menuData, loading: menuDataLoading, error: menuDataError }, setMenuData] = useAxios(
  //   `http://localhost:1337/menu-editor/menu/${menuId}`
  // )
  const [sortlyData, setSortlyData] = useState([])

  useEffect(() => {
    console.log('MENU DATA' , menuData)
    menuData &&
    setSortlyData(convert(remapSortlyInput(menuData)))
  }, [menuData])

  const handleChangeRow = useCallback((id, sortlyData) => (event) => {
    // const index = menuData.findIndex(item => item.id === id);
    const { name, value } = event.target;
    console.log('HANDLE CHANGE ROW ---' , id, name, value, sortlyData)
    onChange(
      'menuData',
      update(sortlyData, {
        [id]: { [name]: { $set: value } },
      })
    );
  }, []);

  const handleDelete = id => {
    const index = menuData.findIndex(item => item.id === id);
    onChange('menuData', remove(menuData, index));
  };

  const handleClickAdd = useCallback((data) => (e) => {
    e.preventDefault()
    console.log('aaaa', data, sortlyData)
    setSortlyData(add(data, {id: e.target.value || Math.floor(Math.random() * Math.floor(99))}))
  },[]);

  const handleSortly = (newItems) => {
    console.log('NEW ITEM::' , newItems)
    setMenuData(newItems);
  }
  if (menuDataLoading) return <p>Loading...</p>
  if (menuDataError) return <p>Error!</p>
  console.log('SORTLY DATA:' , sortlyData)
  return (
    <>
      <div className="row">
        <Sortly
          items={sortlyData || []}
          name={menuData && menuData.title}
          // onChange={setSortly}
          onChange={handleSortly}
        >
          {(props, index) => (
            <SortableTreeItem key={index} {...{ handleDelete, handleChangeRow }} {...props} sortlyData={sortlyData} />
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

