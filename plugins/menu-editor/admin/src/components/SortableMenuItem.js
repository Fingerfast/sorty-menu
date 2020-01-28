import React, {useCallback, memo} from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrag, useDrop } from 'react-sortly';
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
    //cursor: pointer;
    background: #cccccc;
  }
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
  }
`;

export default memo(function SortableMenuItem ({ id, depth, value, onChange, onClick, onKeyDown, editMode, myRef }) {
  // console.log("ITEM RERENDER", id)
  const [{ isDragging }, drag, preview] = useDrag({
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });
  const [, drop] = useDrop();

  const handleClick = useCallback((e) => {
    onClick(id)
  }, [onClick]);

  const handleChange = useCallback((e) => {
    onChange(id, e.target.value)
  }, [onChange]);

  const handleKeyDown = useCallback((e) => {
    onKeyDown(id, e)
  }, [onKeyDown]);

  return (
    <div ref={(ref) => drop(preview(ref))}>
      <Item ref={editMode ? drag : null} style={{ marginLeft: depth * 30 }} key={id} title="Show details">
        <DraggingIcon title={editMode ? 'Přetáhní položku na požadované místo' : 'Přepni do Editmodu'} depth={depth} editMode={editMode}>
          <FontAwesomeIcon icon={faArrowsAlt}/>
        </DraggingIcon>
        <div onClick={handleClick}>
          <EditIcon title={'Editovat položku'}>
            <FontAwesomeIcon icon={faPen}/>
          </EditIcon>
        </div>
        <input style={{width: '100%', padding: '5px 10px'}} value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={myRef}/>
      </Item>
    </div>
  );
});