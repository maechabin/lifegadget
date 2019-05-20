import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { createRedux } from './redux';
import Root from './root/RootContainer';

import './sass/App.scss';

const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
const { store, history } = createRedux(initialData);

// Google Analytics
// history.listen((location) => window.ga('send', 'pageview', location.pathname));

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Root} history={history} />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#content'),
);
