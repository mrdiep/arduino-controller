import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

function Home(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          Header
        </Typography>
        <Typography component="p">
          title
        </Typography>
      </Paper>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

const connectedComponentRedux = connect(mapStateToProps, mapDispatchToProps)(Home);
export default withStyles(styles)(connectedComponentRedux);
