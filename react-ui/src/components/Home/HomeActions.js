import SocketClient from '../../socketClient/socketClient';

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


    if (padPos.x !== payload.x || padPos.y !== payload.y) {
      SocketClient.emit('move', {
        left: x,
        right: y
      });
      dispatch(payload);
    }
  }
}