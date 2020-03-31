// dependencies
import {takeLatest, put} from 'redux-saga/effects';

// constants action type
import * as types from '../constants/actionTypes';

function* showDashboardAsync(action) {
  try {
    yield put({
      type: types.SHOW_DASHBOARD_ASYNC,
      payload: action.payload,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* watchShowDashboard() {
  yield takeLatest(types.SHOW_DASHBOARD, showDashboardAsync);
}
