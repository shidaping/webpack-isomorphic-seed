import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers,compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';
import routes from './routes';
const reducer = combineReducers({
  ...reducers, // eslint-disable-line
  routing: routerReducer
})
const store = createStore(
  reducer,
  compose(applyMiddleware(thunk)),
);

const history = syncHistoryWithStore(browserHistory, store)

const app = (
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>
);
export default app;

