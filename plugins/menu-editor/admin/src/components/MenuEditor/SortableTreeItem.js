import React, {useState} from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrash,
  faBaseballBall,
} from '@fortawesome/free-solid-svg-icons';

const Item = styled.div`
  display: flex;
  cursor: move;
  flex: 1 0 auto;
  border: dashed 1px #e2e2e2;
  border-image: initial;
  padding: 15px;
  background: rgb(255, 255, 255);
`;

const Button = styled.button`
  cursor: move;
`;

const Input = styled.input`
  flex: 1 0 auto;
`;

export default function SortableTreeItem ({data: { id, name, depth }, drag, drop, handleDelete, handleChangeRow, menuItems}) {
  // const [value, setValue] = useState(name)
  // const [debouncedCallback] = useDebouncedCallback((value) => {
  //   setValue(value)
  // }, 200)
  const ref = React.useRef(null);
  drag(drop(ref));

  return (
    <Item ref={ref} style={{ marginLeft: depth * 20 }} key={id}>
      {/* InputText prop `name` sets ID and NAME without possibility to override it */}
      <Input key={id} value={name} name="name" onChange={handleChangeRow(id, menuItems)} />
      {/*<input value={name} name="name" onChange={(e) => debouncedCallback(e.target.value)}  />*/}
      <Button kind="primary" onClick={handleDelete(id, menuItems)}><FontAwesomeIcon icon={faTrash} /></Button>
      {/*<button kind="secondary" onClick={() => handleDelete(id)}>*/}
      {/*  <FormattedMessage id={'menu-editor.MenuEditor.remove'} />*/}
      {/*</button>*/}
    </Item>
  );
};

SortableTreeItem.propTypes = {
  data: PropTypes.object.isRequired,
  drag: PropTypes.func.isRequired,
  drop: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleChangeRow: PropTypes.func.isRequired,
};