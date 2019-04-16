import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { routingArray } from './routes';
import { configureStore } from './store';
import { indexReducer } from './reducers/indexReducer';
import { rootReducer } from './reducers/rootReducer';
import { archiveReducer } from './reducers/archiveReducer';

import { rootState, indexState, archiveState } from './state';

import Root from './containers/Root';

import './sass/App.scss';

// 1. Reducers
const reducers = combineReducers({
  root: rootReducer,
  index: indexReducer,
  archive: archiveReducer,
  // routing: routerReducer,
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
const middleware = () => applyMiddleware(thunk);

// Make Store
const store = configureStore(reducers, initialState, middleware());

// History
// const history = syncHistoryWithStore(browserHistory, store);
const history = createBrowserHistory();

// Google Analytics
// history.listen((location) => window.ga('send', 'pageview', location.pathname));

ReactDOM.render(
  <Provider store={store}>
    {/* </Provider><Router history={history} onUpdate={() => window.scrollTo(0, 0)}> */}
    <Router>
      <Route path="/" component={Root} />
    </Router>
  </Provider>,
  document.querySelector('.content'),
);
