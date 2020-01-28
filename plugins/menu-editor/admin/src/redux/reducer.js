import { fromJS, List } from 'immutable';
import add from 'immutability-helper';

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
  menuItems: List([]),
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
          //.update('menuItems', () => action.menuItems)
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
      console.group()
      console.log(state)
      const test = state.setIn(['menuItems', state.get('menuItems').size], action.value)
      console.log(test)
      console.groupEnd()
      return test
      //return (
        //state
        // .update(action.key, () => action.value)
        //state.update('menuItems', myList => {
        //  myList.push(action.value);
        //  return myList
        //})

        //state.updateIn('menuItems', state.menuItems.set(action.value))
      //);
    default:
      return state;
  }
}

export default menuEditorReducer;
