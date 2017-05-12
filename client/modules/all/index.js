import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import * as reducers from './reducers'
import routes from './routes'
import config from 'config'
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)
const reducer = combineReducers({
  ...reducers, // eslint-disable-line
  routing: routerReducer
})
let store = null;
if(config.env === 'development'){
  store = createStore(
    reducer,
    DevTools.instrument()
  )
}else{
  createStore(
    reducer
  )
}
const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={history} />

  </Provider>,
  document.getElementById('app')
)