// constants action type
import * as types from '../constants/actionTypes';

// initial state
const initialState = {
  dashboardVisible: false,
};

// dashboard reducer
const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_DASHBOARD_ASYNC:
      return {
        ...state,
        dashboardVisible: action.payload,
      };

    default:
      return state;
  }
};
export default dashboardReducer;
