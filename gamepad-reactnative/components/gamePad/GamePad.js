import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as GamePadActions from './GamePadActions';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native'

class GamePad extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text style={{fontWeight: 'bold'}}>
          I am bold
          <Text style={{color: 'red'}}>
            and red
          </Text>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  titleText: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
})

const mapStateToProps = state => {
  return {
    padPos: state.gamePad.position,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(GamePadActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePad);