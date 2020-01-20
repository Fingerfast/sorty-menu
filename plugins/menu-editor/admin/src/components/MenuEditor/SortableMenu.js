import React, {useState, useEffect, useCallback} from 'react';
import Sortly, {remove, add, convert} from 'react-sortly';
import { FormattedMessage } from 'react-intl';
import update from 'immutability-helper';
import SortableTreeItem from './SortableTreeItem';


export default function SortableMenu ({ onChange, editMode, menuItems }) {
  console.log('')
  const [sortlyMenuData, setSortlyMenuData] = useState(menuItems)

  const handleChangeRow = useCallback((id) => (event) => {
    console.log('CHANGE ROW')
    // const index = menuData.findIndex(item => item.id === id);
    const { name, value } = event.target;
    onChange(
      'ModifiedData',
      update(sortlyMenuData, {
        [id]: { [name]: { $set: value } },
      })
    );
  }, []);

  const handleDelete = id => {
    console.log('DELETE ROW')
    const index = menuData.findIndex(item => item.id === id);
    onChange('menuData', remove(menuData, index));
  };

  const handleClickAdd = useCallback((data) => (e) => {
    console.log('ADD ROW', data, e)
    e.preventDefault()
    onChange('modifiedData', add(sortlyMenuData, data))
  },[]);

  const handleSortly = (newItems) => {
    console.log('HANDLE ALL SORTLY')
    setSortlyMenuData(newItems);
  }
  console.log('sortlyMenuData' , sortlyMenuData)

  return (
    <>
      <div className="row">
        <Sortly
          items={sortlyMenuData}
          name={'Sortly title'}
          // onChange={setSortly}
          onChange={handleSortly}
        >
          {(props, index) => (
            <SortableTreeItem key={index} {...{ handleDelete, handleChangeRow }} {...props}/>
          )}
        </Sortly>
      </div>
      <div className="row">
        <button kind="secondary" onClick={handleClickAdd(sortlyMenuData)}>
          <FormattedMessage id={'menu-editor.MenuEditor.add'} />
        </button>
      </div>
    </>
  );
};

