import { fromJS, List } from 'immutable';

import {
  GET_MENU,
  GET_MENU_SUCCEEDED,
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
  submitSuccess: false,
});

function configPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENU:
      return state;
    case GET_MENU_SUCCEEDED:
      console.log('GET_MENU_SUCCEEDED', action);
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
          // .update('modifiedData', () => [])
          //.update('menusList', () => action.menusList)
          .update('submitSuccess', v => (v = !v))
      );
    default:
      return state;
  }
}

export default configPageReducer;
