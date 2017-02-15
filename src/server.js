import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// Store
import { rootState, indexState, archiveState } from './state';
import { configureStore } from './store';

// Reducers
import { rootReducer } from './reducers/rootReducer';
import { indexReducer } from './reducers/indexReducer';
import { archiveReducer } from './reducers/archiveReducer';

// Actions
import { fetchCategoryAsync, fetchUserAsync } from './actions/rootAction';

import config from '../config';
import renderFullPage from './renderFullPage';
import feed from './feed';
import { routes } from './routes.jsx';

const app = express();
const port = process.env.PORT || 3000;
// const router = express.Router();

app.use(helmet());
app.use(compression());
app.use('/assets', express.static('dist'));
app.use('/assets', express.static('public'));
app.get('/feed', (req, res) => {
  return res.send(feed);
});
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  return res.send('User-agent: Twitterbot\nDisallow:');
});
app.use(handleRender);

function handleRender(req, res) {
  // 1. Reducers
  const reducers = combineReducers({
    root: rootReducer,
    index: indexReducer,
    archive: archiveReducer,
    routing: routerReducer,
  });

  // 2. States
  const initialState = {
    root: rootState,
    index: indexState,
    archive: archiveState,
  };

  // 3. Middleware
  const memoryHistory = createMemoryHistory(req.url);
  const middleware = () => applyMiddleware(
    thunk,
    routerMiddleware(memoryHistory),
  );

  // Make Store
  const store = configureStore(reducers, initialState, middleware());

  // History
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // console.dir(renderProps.components[renderProps.components.length - 1]);

      // Promise
      const promise1 = renderProps.components.map(
        c => (c.handleFetch ? c.handleFetch(store.dispatch, renderProps) : Promise.resolve('no fetching')),
      );
      const promise2 = fetchCategoryAsync();
      const promise3 = fetchUserAsync();

      Promise.all([
        Promise.all(promise1),
        promise2(store.dispatch),
        promise3(store.dispatch),
      ]).then(() => {
        const html = ReactDOMServer.renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>,
        );
        const finalState = store.getState();
        return res.status(200).send(renderFullPage(html, finalState));
      });
    } else {
      return res.status(404).send('Not found');
    }
  });
}

app.listen(
  port, () => console.log(`Hello app listening on port ${port}!`)
);
