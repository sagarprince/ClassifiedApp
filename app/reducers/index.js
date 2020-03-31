// dependencies
import {combineReducers} from 'redux';

// reducers
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
});
export default rootReducer;
