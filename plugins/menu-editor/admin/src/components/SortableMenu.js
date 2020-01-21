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

  const handleDelete = useCallback((id, data) => (e) => {
    e.preventDefault();
    const index = data.findIndex(item => item.id === id);
    onChange('menuItems', remove(data, index));
  },[]);

  const handleClickAdd = useCallback((data) => (e) => {
    e.preventDefault();
    onChange('menuItems', add(data, {id: nanoid(12), name: 'novy kokot', depth: 0}));
  },[]);

  const handleSortly = (newItems) => {
    onChange('menuItems', newItems);
  };

  return (
    <Fragment>
      <SortlyWrapper>
        <Sortly
          items={menuItems}
          onChange={handleSortly}
        >
          {(props, index) => (
            <SortableMenuItem key={index} {...{ handleDelete, handleChangeRow }} {...props} menuItems={menuItems}/>
          )}
        </Sortly>
      </SortlyWrapper>
      <button onClick={handleClickAdd(menuItems)}>
        <FormattedMessage id={'menu-editor.MenuEditor.add'} />
      </button>
    </Fragment>
  );
};

