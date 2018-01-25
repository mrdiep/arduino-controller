import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';

import * as HomeActions from './HomeActions';

const styles = theme => ({
  controlPad: theme.mixins.gutters({
    padding: '0!important',
    width: 420,
    height:420,
    //background: 'green'
  }),
  divInner: theme.mixins.gutters({
    marginLeft: 140,
    marginTop: 140,
    padding: '0!important',
    width: 140,
    height:420,
    background: '#44111111'
  }),
  divInner2: theme.mixins.gutters({
    marginLeft:0,
    padding: '0!important',
    marginTop: -280,
    width: 420,
    height:140,
    background: '#44111111'
  })
});

function ControlPad(props) {
  const { classes } = props;

  function onMouseMove(x, y) {
      
    const isStopZone = (x) => {
      return 140 <= x && x <= 280;
    }

    var isInStopZoneX = isStopZone(x);
    var isInStopZoneY = isStopZone(y);
    
    var newX = isInStopZoneX ? 0 : x >= 280 ? x - 280 : x;
    var newY = isInStopZoneY ? 0 : y >= 280 ? y - 280 : y;
    
    var isInLeftZone = x < 210;
    var isInTopZone = y < 210;

    var zoneName;
    if (isInStopZoneX && isInStopZoneY) {
      zoneName = "STOP"
    } else if (isInStopZoneY) {
      zoneName = "STOP-ZONE-Y"

      var value = newX;
      if (isInLeftZone) {
        newX = 0;
        newY = 140 - value;
      }

    } else if (isInStopZoneX) {
      zoneName = "STOP-ZONE-X"
      newY = isInTopZone ? 140 - newY : -newY;
      newX = newY;
    } else if (isInTopZone && isInLeftZone) {
      zoneName = 'TOP-LEFT';
      newX = 0;
      newY = 0;
    } else if (isInTopZone && !isInLeftZone) {
      zoneName = 'TOP-RIGHT';
      newX = 0;
      newY = 0;
    } else if (!isInTopZone && isInLeftZone) {
      zoneName = 'BOTTOM-LEFT';
      newX = 0;
      newY = 0;
    } else if (!isInTopZone && !isInLeftZone) {
      zoneName = 'BOTTOM-RIGHT';
      newX = 0;
      newY = 0;
    }

    newX = Math.floor(newX * 255 / 140);
    newY =  Math.floor(newY * 255 / 140);

    props.homeActions.changePadPos(newX, newY, zoneName);
  }

  const {
    // detectedEnvironment: {
    //   isMouseDetected = false,
    //   isTouchDetected = false
    // } = {},
    // elementDimensions: {
    //   width = 0,
    //   height = 0
    // } = {},
    // isActive = false,
    // isPositionOutside = false,
    position: {
      x = 0,
      y = 0
    } = {}
  } = props;

  console.log(x + '-' + y);
  
  onMouseMove(x, y);


  return (
    <Paper className={classes.controlPad}>
        <div className={classes.divInner}/>
        <div className={classes.divInner2}/>
    </Paper>
  );
}

ControlPad.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    number: state.home.number,
    padPos: state.home.padPos,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(HomeActions, dispatch)
  }
}

const connectedComponentRedux = connect(mapStateToProps, mapDispatchToProps)(ControlPad);
export default withStyles(styles)(connectedComponentRedux);
