import React, {useState} from 'react';
import Sortly, { remove, add } from 'react-sortly';
import nanoid from 'nanoid/non-secure';
import { FormattedMessage } from 'react-intl';
import SortableTreeItem from './SortableTreeItem';
import useAxios from "axios-hooks";

const exampleMenu = [
  {"id":"1","order":0,"name":"Kontakt","parent_id":0,"menu_id":"1"},
  {"id":"2","order":1,"name":"Pobočky","parent_id":"1","menu_id":"1"},
  {"id":"3","order":0,"name":"Kudy k nám","parent_id":"1","menu_id":"1"}
];

export default function SortableMenu ({ onChange, menuId }) {
  // const [{ data: menuData, loading: menuDataLoading, error: menuDataError }] = useAxios(
  //   //TODO: Put ID to fetch details about this menu
  //   'https://api.myjson.com/bins/820fc'
  // )

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
        parentId: parent_id,
        menu_id,
      };
    });
  };

  const [menuData, updateMenuData] = useState(exampleMenu)



  const handleChangeRow = (id, target) => {
    const index = menuData.findIndex(item => item.id === id);
    const { name, value } = target;
    onChange(
      'menuData',
      update(menuData, {
        [index]: { [name]: { $set: value } },
      })
    );
  };

  const handleDelete = id => {
    const index = menuData.findIndex(item => item.id === id);
    onChange('menuData', remove(menuData, index));
  };

  const handleClickAdd = () => {
    onChange(
      'menuData',
      add(menuData, {
        id: nanoid(8),
        name: '',
        menu_uuid: currentMenu,
      })
    );
  };

  return (
    <>
      <div className="row">
        <Sortly
          // items={menuData && menuData.items}
          items={exampleMenu}
          id={menuId}
          name={menuData && menuData.title}
          // onChange={setSortly}
          onChange={values => onChange('menuData', values)}
        >
          {props => (
            <SortableTreeItem {...{ handleDelete, handleChangeRow }} {...props} />
          )}
        </Sortly>
      </div>
      <div className="row">
        <button kind="secondary" onClick={handleClickAdd}>
          <FormattedMessage id={'menu-editor.MenuEditor.add'} />
        </button>
      </div>
    </>
  );
};

