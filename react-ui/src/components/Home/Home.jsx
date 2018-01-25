import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import * as HomeActions from './HomeActions';

import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  controlPad: theme.mixins.gutters({
    margin: 30,
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
    marginTop: 70,
    padding: '0!important',
    marginTop: -280,
    width: 420,
    height:140,
    background: '#44111111'
  })
});

function Home(props) {
  const { classes, padPos } = props;
  
  function isStopZone(x) {
    return 140 <= x && x <= 280;
  }
 const LEFT  = 0, RIGHT = 1, UP = 2, DOWN = 4;

  function detectZoneX(x) {
    return x < 210 ? LEFT : RIGHT;
  }

  function onMouseMove(e) {
    var x = e.clientX  -30;
    var y  = e.clientY - 216;

    console.log(e.clientY);
    

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
        newY = value;
      }
    } else if (isInStopZoneX) {
      zoneName = "STOP-ZONE-X"
      newY = isInTopZone ? newY : -newY;
      newX = newY;
    } else if (isInTopZone && isInLeftZone) {
      zoneName = 'TOP-LEFT';
    } else if (isInTopZone && !isInLeftZone) {
      zoneName = 'TOP-RIGHT';
    } else if (!isInTopZone && isInLeftZone) {
      zoneName = 'BOTTOM-LEFT';
    } else if (!isInTopZone && !isInLeftZone) {
      zoneName = 'BOTTOM-RIGHT';
    }

    //newX = Math.floor(newX * 255 / 140);
    //newY =  Math.floor(newY * 255 / 140);

    props.homeActions.changePadPos(newX, newY, zoneName);
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          Header
        </Typography>
        <Typography component="p">
          <Button onClick={props.homeActions.increaseNumber}>CLICK ME</Button>
          Counter clicked = {props.number}
        </Typography>
      </Paper>

      <Paper className={classes.controlPad} onMouseMove={onMouseMove}>
          <div className={classes.divInner}/>
          <div className={classes.divInner2}/>
      </Paper>

      <p>{`Zone name: ${padPos.zoneName}  ::::  x=${padPos.x}  y=${padPos.y}`}</p>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.log(state);
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

const connectedComponentRedux = connect(mapStateToProps, mapDispatchToProps)(Home);
export default withStyles(styles)(connectedComponentRedux);
