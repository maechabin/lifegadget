import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { routingArray } from './routes';
import { createRedux } from './redux';
import {
  fetchCategoryAndDispatchSetCategoryAsync,
  fetchUserAndDispatchSetUserAsync,
} from './root/rootAction';

import Html from './server/Html';
import Root from './root/RootContainer';
import makeRss from './server/feed';

const { store, history } = createRedux();

const PORT = process.env.PORT || 3030;
const app = express();

// app.use(helmet());
// helmetが使えれば以下は必要ない
app.disable('x-powered-by');
app.use(compression());
app.use('/assets', express.static('build'));
app.use('/assets', express.static('public'));
app.get('/feed', async (req, res) => {
  res.type('rss');
  return makeRss().then((result) => res.send(result));
});
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  return res.send('User-agent: Twitterbot\nDisallow:');
});

/**
 * 参考URL
 * https://alligator.io/react/react-router-ssr/
 * https://github.com/ReactTraining/react-router/tree/master/packages/react-router/docs/api
 */
app.get('*', (req, res) => {
  let context = {};
  res.write('<!doctype html>');

  const currentRoute = routingArray.find((route) => !!matchPath(req.path, route)) || null;

  if (currentRoute) {
    const match = matchPath(req.path, currentRoute);

    Promise.all([
      match && currentRoute.fetchData(match.params, store.dispatch),
      fetchCategoryAndDispatchSetCategoryAsync()(store.dispatch),
      fetchUserAndDispatchSetUserAsync()(store.dispatch),
    ]).then(() => {
      const finalState = store.getState();

      ReactDOMServer.renderToNodeStream(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Html finalState={finalState}>
              <Route path="/" component={Root} history={history} />
            </Html>
          </StaticRouter>
        </Provider>,
      ).pipe(res);
    });
  }
});

app.listen(PORT, () => console.log(`Hello app listening on port ${PORT}!`));
