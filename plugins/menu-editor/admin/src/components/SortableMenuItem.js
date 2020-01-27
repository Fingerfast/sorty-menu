import React, { useEffect, useState, useCallback } from "react";
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrag, useDrop } from 'react-sortly';
import { Button } from 'strapi-helper-plugin';
import debounce from 'lodash/debounce';
import {
  faPen,
  faArrowsAlt,
} from '@fortawesome/free-solid-svg-icons';

const Item = styled.div`
  margin-top: 5px;
  display: flex;
  flex: 1 0 auto;
  border: solid 1px #e2e2e2;
  border-radius: 5px;
  border-image: initial;
  align-items: center;
  padding: 5px;
  background: rgb(255, 255, 255);
  &:hover {
    cursor: pointer;
    background: #cccccc;
  }
`;
const TrashIcon = styled.div`
  display: flex;
  align-items: center;
  > svg {
    font-size: 1.5em;
    color: ${props => props.editMode ? 'black' : '#e2e2e2'}
  }
`;
const Label = styled.div`
  flex: 1 0 auto;
  //border: 1px solid #aed4fb;
  //background-color: white;
  //text-transform: capitalize;
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

const EditIcon = styled.div`
  cursor: ${props => props.editMode ? 'move' : 'normal'};
  display: flex;
  flex: 0 1 auto;
  padding: 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  transition: 0.3s ease-in-out;
  > svg {
    font-size: 1.6em;
    color: black;
    }
  }
  &:hover {
    background: #6c757d;
    //border-radius: 50%;
    //padding: 10px;
  }
`;

export default function SortableMenuItem ({ id, depth, name, pageId, handleChangeRow, handleReturn, editMode, onClickItemDetail }) {
  const [{ isDragging }, drag, preview] = useDrag({
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });
  const [, drop] = useDrop();

  const [inputValue, setInputValue] = useState(name)

  const handleClickMenuItem = (id) => (e) => {
    console.log("KOKOT" , id)
    onClickItemDetail(id)
  }

  const handleInputValue = (id) => (e) => {
    console.log("sdsdsdsd")
    setInputValue(e.target.value)
    handleChangeRow(id, e.target.value)
  }

  const handleKeyDown = (e) => {
    // e.preventDefault()
    if(e.ctrlKey && e.key === 'Enter') handleReturn(id)
  }

  return (
    <div /*onClick={editItem(pageId)}*/ ref={(ref) => drop(preview(ref))}>
      <Item ref={editMode ? drag : null} style={{ marginLeft: depth * 30 }} key={id} title="Show details">
        <DraggingIcon title={editMode ? 'Přetáhní položku na požadované místo' : 'Přepni do Editmodu'} depth={depth} editMode={editMode}>
          <FontAwesomeIcon icon={faArrowsAlt}/>
        </DraggingIcon>
        <div onClick={handleClickMenuItem(pageId)}>
          <EditIcon title={'Editovat položku'}>
            <FontAwesomeIcon icon={faPen}/>
          </EditIcon>
        </div>
        <input style={{width: '100%', padding: '5px 10px'}} value={inputValue} onChange={handleInputValue(id)} onKeyDown={handleKeyDown}/>
        {/*<Label>{name.charAt(0).toUpperCase() + name.slice(1)}</Label>*/}
      </Item>
    </div>
  );
};