import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import { createMemoryHistory, match, RouterContext } from 'react-router';
// import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { StaticRouter, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

// Actions
import {
  fetchCategoryAndDispatchSetCategoryAsync,
  fetchUserAndDispatchSetUserAsync,
} from './root/rootAction';

import renderFullPage from './server/renderFullPage';
import makeRss from './feed';
import { routingArray } from './routes';

import { store, history } from './redux';
import Html from './server/Html';
import Root from './root/RootContainer';

const PORT = process.env.PORT || 3030;
const app = express();
const router = express.Router();

// app.use(helmet());
// app.use(compression());
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
app.get('*', async (req, res) => {
  let context = {};
  res.write('<!DOCTYPE html>');

  // const currentRoute = routingArray.find((route) => !!matchPath(req.url, route)) || null;

  // if (currentRoute) {
  // Promise
  // const promise1 = currentRoute.component.handleFetch
  //   ? currentRoute.component.handleFetch(store.dispatch, currentRoute)
  //   : Promise.resolve('no fetching');
  await fetchCategoryAndDispatchSetCategoryAsync()(store.dispatch);
  await fetchUserAndDispatchSetUserAsync()(store.dispatch);

  const finalState = store.getState();

  console.log(finalState);

  // Promise.all([Promise.all(promise1), promise2(store.dispatch), promise3(store.dispatch)]).then(
  //   () => {
  ReactDOMServer.renderToNodeStream(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Html>
          <Route path="/" component={Root} history={history} />
        </Html>
      </StaticRouter>
    </Provider>,
  ).pipe(res);

  //   },
  // );
  // }
});

app.listen(PORT, () => console.log(`Hello app listening on port ${PORT}!`));
