// dependencies
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

// redux root reducer
import rootReducer from '../reducers';

// redux root saga
import {rootSaga} from '../sagas';

// redux saga middleware
const sagaMiddleware = createSagaMiddleware();

// redux store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export {store};
