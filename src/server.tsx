import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

// Actions
import {
  fetchCategoryAndDispatchSetCategoryAsync,
  fetchUserAndDispatchSetUserAsync,
} from './root/rootAction';

import makeRss from './server/feed';
import { routingArray } from './routes';

import { store, history } from './redux';
import Html from './server/Html';
import Root from './root/RootContainer';

const PORT = process.env.PORT || 3030;
const app = express();
const router = express.Router();

// app.use(helmet());
// app.use(compression());
app.use('/assets', express.static('build'));
app.use('/assets', express.static('public'));
// app.get('/feed', (req, res) => {
//   res.type('rss');
//   return makeRss().then((result) => res.send(result));
// });
// app.get('/robots.txt', (req, res) => {
//   res.type('text/plain');
//   return res.send('User-agent: Twitterbot\nDisallow:');
// });
// app.use(express.static('./src'));

/**
 * 参考URL
 * https://alligator.io/react/react-router-ssr/
 */
app.get('*', (req, res) => {
  let context = {};
  res.write('<!doctype html>');

  const currentRoute = routingArray.find((route) => !!!matchPath(req.url, route)) || null;

  Promise.all([
    currentRoute && currentRoute.fetchData(1, store.dispatch),
    fetchCategoryAndDispatchSetCategoryAsync()(store.dispatch),
    fetchUserAndDispatchSetUserAsync()(store.dispatch),
  ]).then(() => {
    const finalState = store.getState();

    ReactDOMServer.renderToNodeStream(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Html>
            <Route path="/" component={Root} history={history} />
          </Html>
        </StaticRouter>
      </Provider>,
    ).pipe(res);
  });
});

app.listen(PORT, () => console.log(`Hello app listening on port ${PORT}!`));
