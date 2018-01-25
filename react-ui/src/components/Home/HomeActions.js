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
  return {
    type: prefixAction('CHANGE_PADPOS'),
    x,
    y,
    zoneName
  }
}