import {
  ON_CANCEL,
  ON_CHANGE,
  SET_ERRORS,
  SUBMIT,
  SUBMIT_ERROR,
  SUBMIT_SUCCEEDED,
  GET_MENU,
  GET_MENU_SUCCEEDED,
} from './constants';

export function getMenu() {
  return {
    type: GET_MENU,
  };
}

export function getMenuSucceeded({ initialData }) {
  return {
    type: GET_MENU_SUCCEEDED,
    initialData,
  };
}

export function onCancel() {
  return {
    type: ON_CANCEL,
  };
}

export function onChange(key, value) {
  return {
    type: ON_CHANGE,
    key,
    value,
  };
}

export function setErrors(errors) {
  return {
    type: SET_ERRORS,
    errors,
  };
}

export function submit() {
  return {
    type: SUBMIT,
  };
}

export function submitError(errors) {
  return {
    type: SUBMIT_ERROR,
    errors,
  };
}

export function submitSucceeded(data) {
  return {
    type: SUBMIT_SUCCEEDED,
    data,
  };
}
