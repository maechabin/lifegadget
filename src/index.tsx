import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { store } from './redux';
import Root from './root/RootContainer';

import './sass/App.scss';

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
