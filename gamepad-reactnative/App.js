import React, { Component } from 'react';

import LoadingPage from './components/loadingPage';
import GamePad from './components/gamePad';

import store from './store';
import {Provider} from 'react-redux';

export default class App extends Component {
 
  render() {
    return (
      <Provider store = {store}>
        <GamePad />
      </Provider>
    );
  }
}