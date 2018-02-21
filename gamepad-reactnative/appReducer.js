import {combineReducers} from 'redux';
import gamePadReducer from './components/gamePad/GamePadReducers';

export default combineReducers({
  gamePad:gamePadReducer
});