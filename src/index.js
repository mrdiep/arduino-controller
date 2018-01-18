import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HomeAppReducers from './reducers'
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
let store = createStore(HomeAppReducers);

var provider = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(provider, document.getElementById('root'));
registerServiceWorker();
