import React, {useState} from "react";
import {Item} from "./Wrapper";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';
import { useDebouncedCallback } from 'use-debounce';

const SortableTreeItem = props => {
  console.log('PROPS:' , props)
  const {
    data: { id, name, depth },
    drag,
    drop,
    handleDelete,
    handleChangeRow,
  } = props;

  // const [value, setValue] = useState(name)
  // const [debouncedCallback] = useDebouncedCallback((value) => {
  //   setValue(value)
  // }, 200)

  const ref = React.useRef(null);

  drag(drop(ref));

  // const handleChangeInput = e => {
  //   e.preventDefault();
  //   const { target } = e;
  //   handleChangeRow(id, target);
  // };

  return (
    <Item ref={ref} style={{ marginLeft: depth * 20 }} key={id}>
      {/* InputText prop `name` sets ID and NAME without possibility to override it */}
      <input key={id} value={name} name="name" onChange={handleChangeRow(id)} />
      {/*<input value={name} name="name" onChange={(e) => debouncedCallback(e.target.value)}  />*/}
      <button kind="secondary" onClick={() => handleDelete(id)}>
        <FormattedMessage id={'menu-editor.MenuEditor.remove'} />
      </button>
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

export default SortableTreeItem;