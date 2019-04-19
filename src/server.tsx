import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import { createMemoryHistory, match, RouterContext } from 'react-router';
// import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { StaticRouter, matchPath } from 'react-router-dom';
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
import {
  fetchCategoryAndDispatchSetCategoryAsync,
  fetchUserAndDispatchSetUserAsync,
} from './actions/rootAction';

import renderFullPage from './renderFullPage';
import makeRss from './feed';
import { routingArray } from './routes';

// const router = express.Router();

// function handleRender(req: any, res: any) {
//   // 1. Reducers
//   const reducers = combineReducers({
//     root: rootReducer,
//     index: indexReducer,
//     archive: archiveReducer,
//     routing: routerReducer,
//   });

//   // 2. States
//   const initialState = {
//     root: rootState,
//     index: indexState,
//     archive: archiveState,
//   };

//   // 3. Middleware
//   const memoryHistory = createMemoryHistory(req.url);
//   const middleware = () => applyMiddleware(thunk, routerMiddleware(memoryHistory));

//   // Make Store
//   const store = configureStore(reducers, initialState, middleware());

//   // History
//   const history = syncHistoryWithStore(memoryHistory, store);

//   match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
//     if (error) {
//       return res.status(500).send(error.message);
//     } else if (redirectLocation) {
//       return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//     } else if (renderProps) {
//       console.dir(renderProps.components[renderProps.components.length - 1]);

//       // Promise
//       const promise1 = renderProps.components.map((component) =>
//         component.handleFetch
//           ? component.handleFetch(store.dispatch, renderProps)
//           : Promise.resolve('no fetching'),
//       );
//       const promise2 = fetchCategoryAsync();
//       const promise3 = fetchUserAsync();

//       Promise.all([Promise.all(promise1), promise2(store.dispatch), promise3(store.dispatch)]).then(
//         () => {
//           const html = ReactDOMServer.renderToString(
//             <Provider store={store}>
//               <RouterContext {...renderProps} />
//             </Provider>,
//           );
//           const finalState = store.getState();
//           return res.status(200).send(renderFullPage(html, finalState));
//         },
//       );
//     } else {
//       return res.status(404).send('Not found');
//     }
//   });
// }

const PORT = process.env.PORT || 3030;
const app = express();

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
app.use(express.static('./src'));
app.get('/*', (req, res) => {
  // 1. Reducers
  const reducers = combineReducers({
    root: rootReducer,
    index: indexReducer,
    archive: archiveReducer,
    // routing: routerReducer,
  });

  // 2. States
  const initialState = {
    root: rootState,
    index: indexState,
    archive: archiveState,
  };

  // 3. Middleware
  // const memoryHistory = createMemoryHistory(req.url);
  const middleware = () => applyMiddleware(thunk);

  // Make Store
  const store = configureStore(reducers, initialState, middleware());

  const currentRoute = routingArray.find((route) => !!matchPath(req.url, route)) || null;

  if (currentRoute) {
    // Promise
    // const promise1 = currentRoute.component.handleFetch
    //   ? currentRoute.component.handleFetch(store.dispatch, currentRoute)
    //   : Promise.resolve('no fetching');
    const promise2 = fetchCategoryAndDispatchSetCategoryAsync();
    const promise3 = fetchUserAndDispatchSetUserAsync();

    // Promise.all([Promise.all(promise1), promise2(store.dispatch), promise3(store.dispatch)]).then(
    //   () => {
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <currentRoute.component />
      </Provider>,
    );
    const finalState = store.getState();
    return res.status(200).send(renderFullPage(html, finalState));
    //   },
    // );
  }
});

app.listen(PORT, () => console.log(`Hello app listening on port ${PORT}!`));
