import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrag, useDrop } from 'react-sortly';
import { Button } from 'strapi-helper-plugin';
import debounce from 'lodash/debounce';
import {useHistory} from 'react-router-dom';
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

export default function SortableMenuItem ({ id, depth, data: { name, page_id }, editMode }) {
  const [{ isDragging }, drag, preview] = useDrag({
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  const [, drop] = useDrop();

  const history = useHistory()
  const pluginPages = "plugins/content-manager/application::pages.pages";
  const pluginSourceMenus = "plugins/content-manager/plugins::menu-editor.source_menu";
  const myLocation = strapi.router.location.pathname ? strapi.router.location.pathname : '/plugins/menu-editor';

  const editItem = (page_id) => (e) => {
    e.preventDefault()
    history.push(`/${pluginPages}/${page_id}?redirectUrl=${myLocation}`)
  }

  return (
    <div onClick={editItem(page_id)} ref={(ref) => drop(preview(ref))}>
      <div>
        <Item ref={editMode ? drag : null} style={{ marginLeft: depth * 30 }} key={id} title="Show details">
          <DraggingIcon title={editMode ? 'Přetáhní položku na požadované místo' : 'Přepni do Editmodu'} depth={depth} editMode={editMode}>
            <FontAwesomeIcon icon={faArrowsAlt}/>
          </DraggingIcon>
          <EditIcon title={'Editovat položku'}>
            <FontAwesomeIcon icon={faPen}/>
          </EditIcon>

          <Label>{name.charAt(0).toUpperCase() + name.slice(1)}</Label>
        </Item>
      </div>
    </div>
  );
};