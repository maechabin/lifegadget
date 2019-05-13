import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import { createMemoryHistory, match, RouterContext } from 'react-router';
// import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { StaticRouter, matchPath } from 'react-router-dom';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History, createBrowserHistory } from 'history';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// Store
import { rootState } from './root/rootState';
import { indexState } from './index/indexState';
import { archiveState } from './archive/archiveState';
import { configureStore } from './store';

// Reducers
import { rootReducer } from './root/rootReducer';
import { indexReducer } from './index/indexReducer';
import { archiveReducer } from './archive/archiveReducer';

// Actions
import {
  fetchCategoryAndDispatchSetCategoryAsync,
  fetchUserAndDispatchSetUserAsync,
} from './root/rootAction';

import renderFullPage from './server/renderFullPage';
import makeRss from './feed';
import { routingArray } from './routes';

import Html from './server/Html';
import Root from './root/RootContainer';

const PORT = process.env.PORT || 3030;
const app = express();
const router = express.Router();

app.use(helmet());
app.use(compression());
// app.use('/assets', express.static('build'));
// app.use('/assets', express.static('public'));
// app.get('/feed', (req, res) => {
//   res.type('rss');
//   return makeRss().then((result) => res.send(result));
// });
// app.get('/robots.txt', (req, res) => {
//   res.type('text/plain');
//   return res.send('User-agent: Twitterbot\nDisallow:');
// });
// app.use(express.static('./src'));
app.get('/*', (req, res) => {
  let context = {}
  // const currentRoute = routingArray.find((route) => !!matchPath(req.url, route)) || null;

  // if (currentRoute) {
  // Promise
  // const promise1 = currentRoute.component.handleFetch
  //   ? currentRoute.component.handleFetch(store.dispatch, currentRoute)
  //   : Promise.resolve('no fetching');
  // const promise2 = fetchCategoryAndDispatchSetCategoryAsync();
  // const promise3 = fetchUserAndDispatchSetUserAsync();

  // Promise.all([Promise.all(promise1), promise2(store.dispatch), promise3(store.dispatch)]).then(
  //   () => {
  ReactDOMServer.renderToNodeStream(
    <StaticRouter location={req.url} context={context}>
      <Html />
    </StaticRouter>
  ).pipe(res);
  // const finalState = store.getState();
  //   },
  // );
  // }
});

app.listen(PORT, () => console.log(`Hello app listening on port ${PORT}!`));
