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
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 2, backgroundColor: 'skyblue'}} />
        <View style={{flex: 3, backgroundColor: 'steelblue'}} />
      </View>
    )
  }
}

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