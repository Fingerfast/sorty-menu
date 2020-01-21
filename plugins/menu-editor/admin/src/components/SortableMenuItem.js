import React, {useEffect, useState, } from "react";
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrag, useDrop } from 'react-sortly';
import { Button } from 'strapi-helper-plugin'
import {
  faPlus,
  faTrash,
  faArrowsAlt,
} from '@fortawesome/free-solid-svg-icons';

const Item = styled.div`
  display: flex;
  flex: 1 0 auto;
  border: solid 1px #e2e2e2;
  border-radius: 5px;
  border-image: initial;
  align-items: center;
  padding: 5px;
  background: rgb(255, 255, 255);
  &:hover {
    background: #cccccc;
  }
`;
const TrashIcon = styled.div`
  display: flex;
  align-items: center;
  > svg {
    font-size: 1.5em;
    color: ${props => props.editMode ? 'black' : '#e2e2e2'}
`;
const Input = styled.input`
  flex: 1 0 auto;
  text-transform: capitalize;
  font-size: 1.2em;
`;
const DraggingIcon = styled.div`
  cursor: ${props => props.editMode ? 'move' : 'normal'};
  display: flex;
  flex: 0 1 auto;
  padding: 5px;
  border: ${props => props.editMode ? '1px solid black' : '1px solid #e2e2e2'};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  // ${props => props.depth === 0 && "background: #e2e2e2;"};
  > svg {
    font-size: 2em;
    color: ${props => props.editMode ? 'black' : '#e2e2e2'}
  }
`;

export default function SortableMenuItem ({id, depth, data: { name, isNew }, handleChangeRow, handleDelete, editMode}) {

  // const [value, setValue] = useState(name);
  // const debouncedSearchTerm = useDebounce(value, 500);

  // useEffect(
  //   () => {
  //     // Update debounced value after delay
  //     if (debouncedSearchTerm) {
  //       searchCharacters(debouncedSearchTerm)
  //     }
  //   },
  //   [debouncedSearchTerm] // Only re-call effect if value or delay changes
  // );

  const [{ isDragging }, drag, preview] = useDrag({
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  const [, drop] = useDrop();

  return (
    <div ref={(ref) => drop(preview(ref))}>
      <div>
        <Item style={{ marginLeft: depth * 30 }} key={id}>
          <DraggingIcon ref={editMode ? drag : null} depth={depth} editMode={editMode}><FontAwesomeIcon icon={faArrowsAlt}/></DraggingIcon>
          <Input disabled={!editMode} value={name} name="name" onChange={handleChangeRow(id)}/>
          <Button disabled={!editMode} onClick={handleDelete(id)}>
            <TrashIcon editMode={editMode}><FontAwesomeIcon icon={faTrash}/></TrashIcon>
          </Button>
        </Item>
      </div>
    </div>
  );
};