/**
 *
 * ConfigPage reducer
 *
 */

import { fromJS, List } from 'immutable';

import {
  CREATE_MENU,
  GET_MENUS,
  GET_MENUS_SUCCEEDED,
  GET_SETTINGS,
  GET_SETTINGS_SUCCEEDED,
  ON_CANCEL,
  ON_CHANGE,
  //SET_ERRORS,
  //SUBMIT_ERROR,
  SUBMIT_SUCCEEDED,
} from './constants';

const initialState = fromJS({
  didCheckErrors: false,
  formErrors: List([]),
  initialData: [],
  modifiedData: [],
  // settings: [],
  currentMenu: null,
  initialMenus: [],
  // modifiedMenusList: [],
  submitSuccess: false,
});

function configPageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MENU:
    case GET_MENUS:
    case GET_SETTINGS:
      return state;
    case GET_MENUS_SUCCEEDED:
      return (
        state
          .update('initialMenus', () => action.initialMenus)
      );
    case GET_SETTINGS_SUCCEEDED:
      console.log('GET_SETTINGS_SUCCEEDED', action);
      return (
        state
          //.update('didCheckErrors', v => (v = !v))
          //.update('formErrors', () => List([]))
          // .update('initialMenus', () => action.initialMenus)
          // .update('modifiedMenusList', () => action.initialMenus)
          .update('initialData', () => action.initialData)
      );
    case ON_CANCEL:
      return (
        state
          //.update('didCheckErrors', v => (v = !v))
          //.update('formErrors', () => List([]))
          .update('modifiedData', () => [])
          // .update('modifiedMenusList', () => state.get('initialMenus'))
      );
    case ON_CHANGE:
      console.group('ON_CHANGE:');
      // console.log('action', action);
      // console.log('state:', state);
      console.groupEnd();

      return state.update(action.key, () => action.value);
    //case SET_ERRORS:
    //case SUBMIT_ERROR:
    //  return state
    //    .update('didCheckErrors', v => (v = !v))
    //    .update('formErrors', () => List(action.errors));
    case SUBMIT_SUCCEEDED:
      return (
        state
          //.update('didCheckErrors', v => (v = !v))
          //.update('formErrors', () => List([]))
          .update('initialData', () => action.data)
          //.update('initialData', () => action.data)
          .update('modifiedData', () => [])
          //.update('menusList', () => action.menusList)
          .update('submitSuccess', v => (v = !v))
      );
    default:
      return state;
  }
}

export default configPageReducer;
