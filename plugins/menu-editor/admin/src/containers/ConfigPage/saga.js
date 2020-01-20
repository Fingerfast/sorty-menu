// import { LOCATION_CHANGE } from 'react-router-redux';
import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'strapi-helper-plugin';
import { getSettingsSucceeded, getSettings, getMenus, getMenusSucceeded } from './actions';
import { GET_SETTINGS, SUBMIT, GET_MENUS } from './constants';
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

export function* settingsGet() {
  try {
    const currentMenuId = yield select(makeSelectCurrentMenu());
    const {menuList} = yield call(request, `/${pluginId}/${currentMenuId}`, {
      method: 'GET',
    });
    yield put(
      getSettingsSucceeded({
        initialData: convert(remapSortlyInput(menuList)),
      })
    );
  } catch (err) {
    strapi.notification.error('notification.error');
  }
}

export function* menusGet() {
  try {
    const menus = yield call(request, `/${pluginId}/menu`, {
      method: 'GET',
    });

    yield put(
      getMenusSucceeded({
        initialMenus: menus,
      })
    );
  } catch (err) {
    strapi.notification.error('notification.error');
  }
}

export function* submit() {
  //const initialData = yield select(makeSelectInitialData())

  //function difference(setA, setB) {
  //  let _difference = new Set(setA)
  //  for (let elem of setB) {
  //      _difference.delete(elem)
  //  }
  //  return _difference
  //}

  //const CH = difference(new Set(modifiedData), new Set(initialData))
  //const R = initialData.filter(item => {
  //  const rowidMapInitialData = new Set(initialData.map(item => item.rowid))
  //  const rowidMapModifiedData = new Set(modifiedData.map(item => item.rowid))
  //  return difference(rowidMapInitialData, rowidMapModifiedData).has(item.rowid)
  //})

  try {
    const modifiedData = yield select(makeSelectModifiedData());
    // const env = yield select(makeSelectEnv());
    let body = remapSortlyOutput(flatten(modifiedData));

    const requestURL = `/${pluginId}`;
    yield call(request, requestURL, { method: 'PUT', body });

    // Update reducer with optimisticResponse
    strapi.notification.success('email.notification.config.success');

    //yield put(submitSucceeded(convert(remapSortlyInput(response))));
    yield put(getSettings());
  } catch (err) {
    strapi.notification.error('notification.error');
    // TODO handle error PUT
  }
}

function* defaultSaga() {
  yield fork(takeLatest, GET_SETTINGS, settingsGet);
  yield fork(takeLatest, GET_MENUS, menusGet);
  yield fork(takeLatest, SUBMIT, submit);
}

export default defaultSaga;
