// import { LOCATION_CHANGE } from 'react-router-redux';
import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'strapi-helper-plugin';
import { getMenu, getMenuSucceeded, submitSucceeded } from './actions';
import { SUBMIT, GET_MENU, GET_MENU_SUCCEEDED } from './constants';
import {
  makeSelectModifiedData,
  makeSelectCurrentMenu,
  makeSelectInitialMenusList, makeSelectInitialData,
} from './selectors';
import pluginId from '../../pluginId';
import { flatten, convert } from 'react-sortly';

const remapSortlyInput = databaseOutput => {
  return databaseOutput.map(row => {
    const {
      uuid,
      depth_order = 0,
      parent_uuid = null,
    } = row;

    return {
      id: uuid,
      index: depth_order,
      parentId: parent_uuid,
      name: 'title'
    };
  });
};

const remapSortlyOutput = sortlyOutput => {
  return sortlyOutput.map(row => {
    const { id, index, parentId = null } = row;

    return {
      uuid: id,
      depth_order: index,
      parent_uuid: parentId === 0 ? null : parentId,
    };
  });
};

export function* menuGet() {
  try {
    const data = yield call(request, `/${pluginId}/source-menu`, {
      method: 'GET',
    });

    yield put(
      getMenuSucceeded({
        initialData: convert(remapSortlyInput(data)),
      })
    );
  } catch (err) {
    strapi.notification.error('notification.error');
  }
}

export function* submit() {
  try {
    const initialData = yield select(makeSelectInitialData());
    const body = remapSortlyOutput(flatten(initialData));
    const requestURL = `/${pluginId}/source-menu`;
    yield call(request, requestURL, { method: 'PUT', body });
    // Update reducer with optimisticResponse
    strapi.notification.success('email.notification.config.success');
    yield put(submitSucceeded(convert(remapSortlyOutput(body))));
    // yield put(submitSucceeded(body))
    yield put(getMenu());
  } catch (err) {
    strapi.notification.error('notification.error');
  }
}

function* defaultSaga() {
  yield fork(takeLatest, GET_MENU, menuGet);
  yield fork(takeLatest, SUBMIT, submit);
}

export default defaultSaga;
