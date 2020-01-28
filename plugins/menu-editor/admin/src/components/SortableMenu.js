import React, {Fragment, useCallback, memo, useRef, useEffect} from 'react';
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
      font-size: 2em;
    }
  }
`;

const SortlyWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 0 1 700px;
  margin-top: 10px;
`;

export default memo(function SortableMenu({ itemCreator, items, onChange, onItemClick, editMode }) {

  // Click on "add new" empty item with generate name
  const handleCreateItem = useCallback((items) => () => {
    const item = itemCreator(items);
    onChange(add(items, item));
  }, [onChange]);

  // Handle changing name in item's inputs
  const handleUpdateItem = useCallback((items) => (id, value) => {
    const index = items.findIndex(item => item.id === id);
    onChange(update(items, {
      [index]: { name: { $set: value } }
    }));
  }, [onChange]);

  // Click for show details about item (item.page_id can be used for route to any detail page)
  const handleClickOnItem = useCallback((items) => (id) => {
    const item = items.find(item => item.id === id);
    onItemClick(item);
  }, [onItemClick]);

  // CTRL+ENTER add new item under focused input and keep the same depth
  const handleKeyDown = useCallback((items) => (id, e) => {
    if(e.ctrlKey && e.key === 'Enter') {
      const index = items.findIndex(item => item.id === id);
      const item = itemCreator(items);
      onChange(insert(items, item, index));
    }
  }, [onChange]);

  // Focus latest added input
  const ref = useRef(null)
  useEffect(() => {
    ref.current && ref.current.focus()
  }, [ ref, items])

  return (
    <Fragment>
      <ActionsMenu>
        <Button kind="primary" title={editMode ? 'Add new item in structure' : 'You must be in "Edit mode"'} disabled={!editMode}
                onClick={handleCreateItem(items)} style={editMode ? {
          color: 'white',
          border: '1px solid #0097f6',
          borderRadius: '5px',
          height: '3.5em',
          fontSize: '16px',
          lineHeight: '2.5em',
          display: 'flex',
          alignItems: 'center',
        } : { color: 'grey' }}><FontAwesomeIcon icon={faPlus} />Vytvořit položku ve struktuře</Button>
      </ActionsMenu>

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
              onClick={handleClickOnItem(items)}
              onChange={handleUpdateItem(items)}
              onKeyDown={handleKeyDown(items)}
              myRef={ref}
            />
          )}
        </Sortly>
      </SortlyWrapper>
    </Fragment>
  );
});