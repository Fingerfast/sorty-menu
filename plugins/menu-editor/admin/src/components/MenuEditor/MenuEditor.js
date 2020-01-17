import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ContextProvider } from 'react-sortly';
import update from 'immutability-helper';
import useAxios from 'axios-hooks';
import { FormattedMessage } from 'react-intl';
import SortableMenu from './SortableMenu';
import Select from 'react-select';
import styled from 'styled-components';
import MyModal from './Modal';

const MyButton = styled.button`
  padding: 10px;
  background: #aed4fb;
`;

export default function MenuEditor ({ onChange, editMode}) {
  const [{ data: menuList, loading: menuListLoading, error: menuListError }] = useAxios(
    //TODO: Put URL to fetch menuList for select correct menu === ${menuList}
    'http://localhost:1337/menu-editor/menu'
  )
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeModal, setActiveModal] = useState(false);

  const [
    { data: postData, loading: postLoading, error: postError },executePost] = useAxios(
    {
      url: 'http://mnovak4:1337/menu-editor/menu',
      method: 'POST'
    },
    { manual: true }
  )

  // function updateData(title) {
  //   executePost({
  //     data: {
  //       title: 'ahoj'
  //     }
  //   })
  // }

  const updateData = useCallback ((title) => {
    executePost({
      data: {
        title: title,
      }
    })
    // TODO: do POST request with title
  }, [])


  const changeActiveMenu = useCallback ((e) => {
    console.log('EEE' , e)
    setActiveMenu(e)
    // let menuId = menuList.filter(menuItem => menuItem.title === e.target.value)[0].id
    // TODO: do get request with id to fetch details of selected menu
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
    <Fragment>
      <FormattedMessage id={'menu-editor.MenuEditor.chooseMenu'}>
        {message => <option value={''}>{message}</option>}
      </FormattedMessage>
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
      <br />
      <MyButton onClick={addMenuClick(true)}>Přidat menu</MyButton>
      <MyModal activated={activeModal} setActivated={setActiveModal}/>
      <div>Vybrane menu je: {activeMenu && activeMenu.name}</div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <DndProvider backend={HTML5Backend}>
            <ContextProvider>
              <SortableMenu editMode={editMode} onChange={onChange} menuId={activeMenu && activeMenu.id}/>
            </ContextProvider>
          </DndProvider>
        </div>
      </div>
    </Fragment>
  );
};

