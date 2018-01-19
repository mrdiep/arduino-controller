import { combineReducers } from 'redux';

import HomeReducers from '../components/Home/HomeReducers';

export default combineReducers({
  home: HomeReducers
});