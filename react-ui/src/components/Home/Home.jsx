import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import * as HomeActions from './HomeActions';

import Typography from 'material-ui/Typography';
import ReactCursorPosition from 'react-cursor-position';
import ControlPad from './ControlPad';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  watcherPosPad: theme.mixins.gutters({
    margin: 30,
    padding: '0!important',
    width: 420,
    height:420,
    background:'green'
  }),
});

function Home(props) {
  const { classes, padPos } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          Hello
        </Typography>
        <Typography component="p">
          <Button onClick={props.homeActions.increaseNumber}>CLICK ME</Button>
          Counter clicked = {props.number}
        </Typography>
      </Paper>

      <div className={classes.watcherPosPad} elevation={6}>
        <ReactCursorPosition >
          <ControlPad />
        </ReactCursorPosition>
      </div>
      
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
