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

ReactDOM.render((
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>
), document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./routes', () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    const nextRoutes = require('./routes').default;
    ReactDOM.render(
      <Provider store={store}>
        <Router routes={nextRoutes} history={history} />
      </Provider>,
      document.getElementById('app'),
    );
  });
}
