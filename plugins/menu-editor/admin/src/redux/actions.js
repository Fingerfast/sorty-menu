import {
  ON_CHANGE,
  SUBMIT,
  GET_MENU,
  GET_MENU_SUCCEEDED, SUBMIT_SUCCEEDED,
} from './constants';

export function getMenu() {
  return {
    type: GET_MENU,
  };
}
export function getMenuSucceeded({ menuItems }) {
  return {
    type: GET_MENU_SUCCEEDED,
    menuItems,
  };
}
export function onChange(value) {
  return {
    type: ON_CHANGE,
    value,
  };
}
export function submit() {
  return {
    type: SUBMIT,
  };
}