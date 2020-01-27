import React, { Fragment, useCallback } from 'react';
import Sortly, { add, insert } from 'react-sortly';
import update from 'immutability-helper';
import SortableMenuItem from './SortableMenuItem';
import styled from 'styled-components';
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

export default function SortableMenu({ itemCreator, items, onChange, onItemClick, editMode }) {

  const handleCreateItem = useCallback(() => {
    const item = itemCreator(items);
    onChange(add(items, item));
  }, [items, onChange]);

  const handleUpdateItem = useCallback((id, value) => {
    const index = items.findIndex(item => item.id === id);
    onChange(update(items, {
      [index]: { name: { $set: value } }
    }));
  }, [items, onChange]);

  const handleClickOnItem = useCallback((id) => {
    const item = items.find(item => item.id === id);
    onItemClick(item);
  }, [onItemClick, items]);

  const handleKeyDown = useCallback((id, e) => {
    if(e.ctrlKey && e.key === 'Enter') {
      const index = items.findIndex(item => item.id === id);
      const item = itemCreator(items);
      onChange(insert(items, item, index));
    }
  }, [onChange, items]);

  return (
    <Fragment>
      <ActionsMenu>
        <Button kind="primary" title={editMode ? 'Add new item in structure' : 'You must be in "Edit mode"'} disabled={!editMode}
                onClick={handleCreateItem} style={editMode ? {
          color: 'black',
          border: '1px solid #0097f6',
          borderRadius: '5px'
        } : { color: 'grey' }}><FontAwesomeIcon icon={faPlus} />Vytvořit položku ve struktuře</Button>
      </ActionsMenu>
      {items.length > 0 ?
        <SortlyWrapper>
          <Sortly
            items={items}
            onChange={onChange}
          >
            {(props) => (
              <SortableMenuItem
                id={props.data.id}
                value={props.data.name}
                depth={props.depth}
                editMode={editMode}
                onClick={handleClickOnItem}
                onChange={handleUpdateItem}
                onKeyDown={handleKeyDown}
              />
            )}
          </Sortly>
        </SortlyWrapper> :
        <div>loading...</div>}
    </Fragment>
  );
};
