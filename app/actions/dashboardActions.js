// constants action type
import * as types from '../constants/actionTypes';

const showDashboard = payload => ({
  type: types.SHOW_DASHBOARD,
  payload,
});
export {showDashboard};
