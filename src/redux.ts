import { combineReducers, applyMiddleware } from 'redux';
import { History, createBrowserHistory, createMemoryHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { configureStore } from './store';
import { indexReducer } from './index/indexReducer';
import { rootReducer } from './root/rootReducer';
import { archiveReducer } from './archive/archiveReducer';

import { rootState } from './root/rootState';
import { indexState } from './index/indexState';
import { archiveState } from './archive/archiveState';
import { State } from './state.model';

export function createRedux(state?: State) {
  // History
  const history = createMemoryHistory();

  // 1. Reducers
  const reducers = (history: History) =>
    combineReducers({
      root: rootReducer,
      index: indexReducer,
      archive: archiveReducer,
      router: connectRouter(history),
    });

  // 2. States
  const initialState = state
    ? state
    : {
        root: rootState,
        index: indexState,
        archive: archiveState,
      };

  // 3. Middleware
  const middleware = () => applyMiddleware(routerMiddleware(history), thunk);

  // Make Store
  return {
    store: configureStore(reducers(history), initialState, middleware()),
    history,
  };
}
