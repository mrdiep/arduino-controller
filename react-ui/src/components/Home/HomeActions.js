import {
  moveNow,
  moveByDirection
} from '../../socketClient';

const prefixAction = actionType => 'HOME_' + actionType;

export function changePropValue(propName, value) {
  return {
    type: prefixAction('CHANGE_PROP'),
    propName,
    value
  }
}

export function increaseNumber() {
  return {
    type: prefixAction('INCREASE')
  }
}

export function changePadPos(x, y, zoneName) {
  var payload = {
    type: prefixAction('CHANGE_PADPOS'),
    x,
    y,
    zoneName
  }

  return (dispatch, getState) => {
    var padPos = getState().home.padPos;

    if (padPos.x !== x || padPos.y !== y) {
      moveNow(x, y);
      dispatch(payload);
    }
  }
}

export function changeDirection(type) {
  return (dispatch, getState) => {
    
    moveByDirection(type, speed);

    // switch (type) {
    //   case 'forward':
    //   moveNow(255, 255);
    //     break;
    //   case 'reverse':
    //     moveNow(-255, -255);
    //     break;
    //   case 'left':
    //     moveNow(-255, 255);
    //     break;
    //   case 'right':
    //     moveNow(255, -255);
    //     break;
    // }
  }
}