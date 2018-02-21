export function changePadPos(x, y, zoneName) {
  var payload = {
    type: 'PADPOS_CHANGED',
    x,
    y,
    zoneName
  }

  return (dispatch, getState) => {
    var padPos = getState().gamePad.position;

    if (padPos.x !== x || padPos.y !== y) {
      //moveNow(x, y);
      dispatch(payload);
    }
  }
}