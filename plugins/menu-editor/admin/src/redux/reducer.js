import { fromJS, List } from 'immutable';

import {
  GET_MENU,
  GET_MENU_SUCCEEDED,
  ON_CANCEL,
  ON_CHANGE,
  UNDO,
  REDO,
} from './constants';

const initialState = fromJS({
  didCheckErrors: false,
  formErrors: List([]),
  menuItems: [],
  modifiedMenuItemsData: [],
});

function menuEditorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENU:
      return (state
        .update('isLoading' , () => true)
      );
    case GET_MENU_SUCCEEDED:
      return (
        state
          .update('menuItems', () => action.menuItems)
          .update('isLoading' , () => false)
      );
    case ON_CANCEL:
      return (
        state
          .update('modifiedMenuItemsData', () => [])
      );
    case UNDO:
      return (
        state
          .update('modifiedMenuItemsData', () => [])
      );
    case REDO:
      return (
        state
          .update('modifiedMenuItemsData', () => [])
      );
    case ON_CHANGE:
      return (
        state
         .update(action.key, () => action.value)
      );
    default:
      return state;
  }
}

export default menuEditorReducer;