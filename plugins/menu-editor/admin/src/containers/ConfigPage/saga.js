// import { LOCATION_CHANGE } from 'react-router-redux';
import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'strapi-helper-plugin';
import { getMenu, getMenuSucceeded } from './actions';
import { SUBMIT, GET_MENU, GET_MENU_SUCCEEDED } from './constants';
import {
  makeSelectModifiedData,
  makeSelectCurrentMenu,
  makeSelectInitialMenusList,
} from './selectors';
import pluginId from '../../pluginId';
import { flatten, convert } from 'react-sortly';

const remapSortlyInput = databaseOutput => {
  return databaseOutput.map(row => {
    const {
      id,
      parent_id = null,
      menu_id,
      order,
      title,
    } = row;

    return {
      id,
      index: order,
      name: title,
      parentId: parent_id,
      menu_id,
    };
  });
};

const remapSortlyOutput = sortlyOutput => {
  return sortlyOutput.map(row => {
    const { rowid, id, index, name, parentId = null, page_id, menu_uuid } = row;

    return {
      id: rowid,
      uuid: id,
      index,
      name,
      parent_uuid: parentId,
      menu_uuid,
      page_id,
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
    const modifiedData = yield select(makeSelectModifiedData());
    const body = remapSortlyOutput(flatten(modifiedData));
    const requestURL = `/${pluginId}/source-menu`;

    yield call(request, requestURL, { method: 'PUT', body });
    // Update reducer with optimisticResponse
    strapi.notification.success('email.notification.config.success');
    //yield put(submitSucceeded(convert(remapSortlyInput(response))));
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
