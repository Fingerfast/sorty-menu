import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'strapi-helper-plugin';
import { getMenu, getMenuSucceeded, submitSucceeded } from './actions';
import { GET_MENU, SUBMIT } from './constants';
import { SelectMenuItemsData, SelectModifiedMenuItemsData} from './selectors';
import pluginId from '../pluginId';
import { flatten, convert } from 'react-sortly';
import { remapSortlyInput, remapSortlyOutput } from '../utils/RemapSortlyData';

export function* menuGet() {
  try {
    const data = yield call(request, `/${pluginId}/source-menu`, {
      method: 'GET',
    });

    yield put(
      getMenuSucceeded({
        menuItems: convert(remapSortlyInput(data)),
      })
    );
  } catch (err) {
    strapi.notification.error('notification.error');
  }
}

export function* submit() {
  try {
    const menuItems = yield select(SelectMenuItemsData());
    const body = remapSortlyOutput(flatten(menuItems));
    const requestURL = `/${pluginId}/source-menu`;
    yield call(request, requestURL, { method: 'PUT', body });
    yield put(submitSucceeded(convert(remapSortlyOutput(body))));
    yield put(getMenu());
    strapi.notification.success('email.notification.menu.success');
  } catch (err) {
    strapi.notification.error('notification.error');
  }
}

function* defaultSaga() {
  yield fork(takeLatest, GET_MENU, menuGet);
  yield fork(takeLatest, SUBMIT, submit);
}
export default defaultSaga;
