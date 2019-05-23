import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { createRedux } from './redux';
import Root from './root/RootContainer';
// import registerServiceWorker from './registerServiceWorker';

import './sass/App.scss';

let initialData;

if (document.querySelector('#initial-data') !== null) {
  const a = document.querySelector('#initial-data');
  const b = a && a.getAttribute('data-json');
  if (b) {
    initialData = JSON.parse(b);
  }
}

const { store, history } = createRedux(initialData);

// Google Analytics
// history.listen((location) => window.ga('send', 'pageview', location.pathname));

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Root} history={history} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('content'),
);

// registerServiceWorker();
