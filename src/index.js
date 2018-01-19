import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import HomeAppReducers from './reducers'
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import logger from './middlwares/logger';
import crashReporter from './middlwares/crashReporter';

let store = createStore(
  HomeAppReducers,
  applyMiddleware(logger, crashReporter, thunk)
);

var provider = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(provider, document.getElementById('root'));
registerServiceWorker();
