// dependencies
import {all, fork} from 'redux-saga/effects';

// sagas
import {watchShowDashboard} from './dashboardSaga';

// root saga
export function* rootSaga() {
  yield all([fork(watchShowDashboard)]);
}
