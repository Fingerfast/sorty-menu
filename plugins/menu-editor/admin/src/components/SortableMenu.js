import React, {useCallback, Fragment} from 'react';
import Sortly, {remove, add} from 'react-sortly';
import { FormattedMessage } from 'react-intl';
import update from 'immutability-helper';
import nanoid from 'nanoid/non-secure';
import SortableMenuItem from './SortableMenuItem';
import styled from 'styled-components';

const SortlyWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

export default function SortableMenu ({ menuItems, modifiedMenuItemsData, onChange, editMode }) {
  const handleChangeRow = useCallback((id, data) => (e) => {
    const index = data.findIndex(item => item.id === id);
    const { name, value } = e.target;
    onChange(
      'menuItems',
      update(data, {
        [index]: { [name]: { $set: value }},
      })
    );
  }, []);

  // const handleDelete = useCallback((id) => (e) => {
  //   e.preventDefault();
  //   console.log('NEBUDOU MENU ITESM' , menuItems, id)
  //   const index = menuItems.findIndex(item => item.id === id);
  //   onChange('menuItems', remove(menuItems, index));
  // },[]);

  // const handleClickAdd = useCallback((data) => (e) => {
  //   console.log('MENU ITEMS!!!!!' , menuItems)
  //   e.preventDefault();
  //   onChange('menuItems', add(data, {id: nanoid(12), name: `novy kokot${nanoid(4)}`, depth: 0}));
  // },[]);
  const handleClickAdd = (e) => {
    console.log('ADD--' , e, menuItems)
    e.preventDefault();
    onChange('menuItems', add(menuItems, {
      id: Date.now().toString(),
      name: `novy kokot${nanoid(4)}`,
    }));
  };

  const handleDelete = (id) => (e) => {
    e.preventDefault();
    console.log('NEBUDOU MENU ITESM' , menuItems, id)
    const index = menuItems.findIndex(item => item.id === id);
    onChange('menuItems', remove(menuItems, index));
  };


  const handleSortly = (newItems) => {
    console.log('OLD MENU ITEMS' , menuItems)
    onChange('menuItems', newItems);
    console.log('NEW ITEMS' , newItems)
  };
  console.log('SORTLY!!!!!!!')

  return (
    <Fragment>
      <SortlyWrapper>
        <Sortly
          items={menuItems}
          onChange={handleSortly}
        >
          {(props) => (
            <SortableMenuItem {...{ handleDelete, handleChangeRow, menuItems }} {...props}/>
          )}
        </Sortly>
      </SortlyWrapper>
      <button onClick={handleClickAdd}>
        <FormattedMessage id={'menu-editor.MenuEditor.add'} />
      </button>
    </Fragment>
  );
};

