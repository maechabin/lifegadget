import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History, createBrowserHistory } from 'history';

import { routingArray } from './routes';
import { configureStore } from './store';
import { indexReducer } from './index/indexReducer';
import { rootReducer } from './root/rootReducer';
import { archiveReducer } from './archive/archiveReducer';

import { rootState, indexState, archiveState } from './state';

import Root from './root/RootContainer';

import './sass/App.scss';

// History
const history = createBrowserHistory();

// 1. Reducers
const reducers = (history: History) =>
  combineReducers({
    root: rootReducer,
    index: indexReducer,
    archive: archiveReducer,
    router: connectRouter(history),
  });

// 2. States
// const rootState = window.__PRELOADED_STATE__.root;
// const indexState = window.__PRELOADED_STATE__.index;
// const archiveState = window.__PRELOADED_STATE__.archive;
// const initialState = {
//   root: rootState,
//   index: indexState,
//   archive: archiveState,
// };
const initialState = {
  root: rootState,
  index: indexState,
  archive: archiveState,
};

// 3. Middleware
const middleware = () => applyMiddleware(routerMiddleware(history), thunk);

// Make Store
const store = configureStore(reducers(history), initialState, middleware());

// Google Analytics
// history.listen((location) => window.ga('send', 'pageview', location.pathname));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={Root} history={history} />
    </Router>
  </Provider>,
  document.querySelector('.content'),
);
