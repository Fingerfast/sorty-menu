import React, {
  useState,
  useCallback,
} from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ContextProvider } from 'react-sortly';
// import update from 'immutability-helper';
import useAxios from 'axios-hooks';
import { FormattedMessage } from 'react-intl';
import SortableMenu from './SortableMenu';
import Select from 'react-select';
import styled from 'styled-components';
import MyModal from './Modal';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ActionsMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const TitleInput = styled.input`
  padding: 10px;
  box-sizing: border-box;
  background-color: ${props => !props.editMode ? 'none' : '#aed4fb'};
  border: ${props => props.editMode ? '1px solid #aed4fb' : 'none'}
`;

const MyButton = styled.button`
  //align-items: center;
  flex: 0 1 auto;
  padding: 10px;
  background: ${props => props.disabled ? '#B0AAB3' : '#aed4fb'};
`;

export default function MenuEditor ({ onChange, editMode, initialData, modifiedData, currentMenu}) {
  const [{ data: menuList, loading: menuListLoading, error: menuListError }] = useAxios(
    //TODO: Put URL to fetch menuList for select correct menu === ${menuList}
    'http://localhost:1337/menu-editor/menu'
  )
  console.log('INITIAL DATA::' , initialData)
  console.log('MODIFIED DATA::' , modifiedData)
  console.log('CURRENT DATA::' , currentMenu)
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  console.log('MENU EDITOR:::' , menuList, menuListLoading, menuListError, activeMenu)

  const changeActiveMenu = useCallback ((e) => {
    // setActiveMenu(e)
    // onChange({})
  }, [])

  const addMenuClick = useCallback((active) => (e) => {
    e.preventDefault()
    console.log('ACTIVE' , active)
    setActiveModal(active);
  }, [])

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {;
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
            ? data.color
            : isFocused
              ? '#007bff'
              : null,
        cursor: isDisabled ? 'not-allowed' : 'default',
        color: 'black',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? 'white' : 'blue'),
        },
      };
    },
  };
  return (
    <Wrapper>
      <ActionsMenu>
        <MyButton onClick={addMenuClick(true)}>
          <FormattedMessage id={'menu-editor.MenuEditor.addNewMenu'}>
            {message => <option value={''}>{message}</option>}
          </FormattedMessage>
        </MyButton>
        {/*{activeMenu &&*/}
        {/*  <FormattedMessage id={editMode ? 'menu-editor.ConfigPage.description' : 'menu-editor.ConfigPage.switchToEditMode'}>*/}
        {/*      {message => <MyButton title={message} disabled={!editMode} onClick={addMenuClick(true)}>{message}</MyButton>}*/}
        {/*  </FormattedMessage>*/}
        {/*}*/}
      </ActionsMenu>
      <MyModal activated={activeModal} setActivated={setActiveModal}/>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isLoading={false}
        isSearchable={true}
        onChange={changeActiveMenu}
        styles={colourStyles}
        options={menuList && menuList.map((menu) => {
          return {
            label: menu.title,
            id: menu.id,
          }
        })}
      />

      <FormattedMessage id={'menu-editor.MenuEditor.chooseMenu'}>
        {message => (<TitleInput value={activeMenu && activeMenu.label || ''} disabled={!editMode} onChange={() => {}} editMode={editMode}/>)}
      </FormattedMessage>

      <div className="row">
        <div className="col-xs-12 col-md-6">
          <DndProvider backend={HTML5Backend}>
            <ContextProvider>
              <SortableMenu editMode={editMode} onChange={onChange} menuId={activeMenu && activeMenu.id}/>
            </ContextProvider>
          </DndProvider>
        </div>
      </div>
    </Wrapper>
  );
};

