import React, {useState, useEffect, useCallback, Fragment} from 'react';
import Sortly, {remove, add, convert} from 'react-sortly';
import { FormattedMessage } from 'react-intl';
import update from 'immutability-helper';
import nanoid from 'nanoid/non-secure';
import SortableTreeItem from './SortableTreeItem';


export default function SortableMenu ({ onChange, editMode, menuItems, modifiedData }) {
  const [sortlyMenuItems, setSortlyMenuItems] = useState(menuItems)
  const handleChangeRow = useCallback((id) => (event) => {
    console.log('CHANGE ROW')
    // const index = menuData.findIndex(item => item.id === id);
    const { name, value } = event.target;
    onChange(
      'ModifiedData',
      update(menuItems, {
        [id]: { [name]: { $set: value } },
      })
    );
  }, []);

  const handleDelete = id => {
    const index = menuItems.findIndex(item => item.id === id);
    console.log('DELETE ROW', id, index, menuItems)
    setSortlyMenuItems(remove(menuItems, id))
    onChange('initialData', remove(menuItems, index));
  };

  const handleClickAdd = useCallback((data) => (e) => {
    // async function generate
    console.log('ADD ROW', data, e)
    e.preventDefault()
    setSortlyMenuItems(add(data, {id: nanoid(12)}))
    onChange('initialData', add(data, {id: nanoid(12), name: 'novy kokot', depth: 0}))
  },[]);

  const handleSortly = (newItems) => {
    console.log('HANDLE ALL SORTLY', newItems)
    setSortlyMenuItems(newItems)
    onChange('initialData', newItems)
  }
  console.log('menuItems' , menuItems)
  console.log('SORTLY MENU ITEMS' , sortlyMenuItems)

  return (
    <Fragment>
      <div className="row">
        <Sortly
          items={menuItems}
          onChange={handleSortly}
        >
          {(props, index) => (
            <SortableTreeItem key={index} {...{ handleDelete, handleChangeRow }} {...props}/>
          )}
        </Sortly>
      </div>
      <div className="row">
        <button kind="secondary" onClick={handleClickAdd(menuItems)}>
          <FormattedMessage id={'menu-editor.MenuEditor.add'} />
        </button>
      </div>
    </Fragment>
  );
};

