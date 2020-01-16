import React from 'react';

import Sortly, { remove, add } from 'react-sortly';

import nanoid from 'nanoid/non-secure';
import { FormattedMessage } from 'react-intl';
import SortableTreeItem from './SortableTreeItem';

const MySortableTree = ({ onChange, currentMenu, modifiedData }) => {

  const handleChangeRow = (id, target) => {
    const index = modifiedData.findIndex(item => item.id === id);
    const { name, value } = target;
    onChange(
      'modifiedData',
      update(modifiedData, {
        [index]: { [name]: { $set: value } },
      })
    );
  };

  const handleDelete = id => {
    const index = modifiedData.findIndex(item => item.id === id);
    onChange('modifiedData', remove(modifiedData, index));
  };

  const handleClickAdd = () => {
    onChange(
      'modifiedData',
      add(modifiedData, {
        id: nanoid(8),
        name: '',
        menu_uuid: currentMenu,
      })
    );
  };

  return (
    <>
      <div className="row">
        <Sortly
          items={modifiedData}
          id={currentMenu}
          name={currentMenu}
          // onChange={setSortly}
          onChange={values => onChange('modifiedData', values)}
        >
          {props => (
            <SortableTreeItem {...{ handleDelete, handleChangeRow }} {...props} />
          )}
        </Sortly>
      </div>
      <div className="row">
        <button kind="secondary" onClick={handleClickAdd}>
          <FormattedMessage id={'menu-editor.MenuEditor.add'} />
        </button>
      </div>
    </>
  );
};

export default MySortableTree;