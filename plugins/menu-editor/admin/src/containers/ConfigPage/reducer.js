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
});

function configPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENU:
      return state;
    case GET_MENU_SUCCEEDED:
      console.log('GET_MENU_SUCCEEDED', action);
      return (
        state
          .update('initialData', () => action.initialData)
      );
    case ON_CANCEL:
      return (
        state
          .update('modifiedData', () => [])
      );
    case ON_CHANGE:
      return state.update(action.key, () => action.value);
    case SUBMIT_SUCCEEDED:
      return (
        state
          .update('initialData', () => action.data)
      );
    default:
      return state;
  }
}

export default configPageReducer;
