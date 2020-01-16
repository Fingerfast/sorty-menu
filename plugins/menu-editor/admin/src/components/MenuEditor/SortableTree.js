import React from 'react';
import Sortly, { ContextProvider, remove, add } from 'react-sortly';

export default function MySortableTree ({ onChange, currentMenu, modifiedData = [] }) {
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
            <ItemRenderer {...{ handleDelete, handleChangeRow }} {...props} />
          )}
        </Sortly>
      </div>
      <div className="row">
        <Button kind="secondary" onClick={handleClickAdd}>
          <FormattedMessage id={'menu-editor.EditForm.add'} />
        </Button>
      </div>
    </>
  );
};

MySortableTree.propTypes = {
  // didCheckErrors: PropTypes.bool.isRequired,
  // formErrors: PropTypes.array.isRequired,
  modifiedData: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  currentMenu: PropTypes.string.isRequired,
};