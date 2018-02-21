import { fromJS, set  } from 'immutable';

export default function GamePadReducers(state = { position: {} }, action) {
  var newState = fromJS(state).toJS();

  switch (action.type) {
    case 'PADPOS_CHANGED':
      newState.position = { x: action.x, y: action.y, zoneName: action.zoneName };
  }

  return newState;
}