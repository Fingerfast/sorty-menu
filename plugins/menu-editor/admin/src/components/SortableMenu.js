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
    color: ${props => props.editMode ? 'white' : 'grey'};
    border-radius: 5px;
    height: 3.1em;
    font-size: 16px;
    line-height: 2.2em;
    display: flex;
    align-items: center;
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
  }, [ items.length ])

  return (
    <Fragment>
      <ActionsMenu editMode={editMode}>
        <Button disabled={editMode} kind={editMode ? "primary" : "secondary"} disabled={!editMode} onClick={handleCreateItem(items)}>
          <FontAwesomeIcon icon={faPlus} />Vytvořit položku ve struktuře
        </Button>
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
              isNew={props.data.isNew}
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