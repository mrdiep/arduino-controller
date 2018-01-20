import { fromJS, set  } from 'immutable';

export default function HomeReducers(state = {number : 0}, action) {
  var newState = fromJS(state).toJS();

  switch (action.type) {
    case 'HOME_CHANGE_PROP':
      newState[action.propName] = action.value;

    case 'HOME_INCREASE':
      newState.number = newState.number + 1;
  }

  return newState;
}