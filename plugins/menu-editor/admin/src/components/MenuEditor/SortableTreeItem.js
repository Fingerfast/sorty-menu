import React from "react";
import {Item} from "./Wrapper";
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';

const SortableTreeItem = props => {
  const {
    data: { id, name, depth },
    drag,
    drop,
    handleDelete,
    handleChangeRow,
  } = props;

  const ref = React.useRef(null);

  drag(drop(ref));

  const handleChangeInput = e => {
    e.preventDefault();
    const { target } = e;
    handleChangeRow(id, target);
  };

  return (
    <Item ref={ref} style={{ marginLeft: depth * 20 }} key={id}>
      {/* InputText prop `name` sets ID and NAME without possibility to override it */}
      <input value={name} name="name" onChange={handleChangeInput} />
      <button kind="secondary" onClick={() => handleDelete(id)}>
        {''}
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