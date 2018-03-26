import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import TitleBar from './TitleBar';
import { StackNavigator } from 'react-navigation';

export default class RegisterPerson extends Component {
  render() {
    return (
      <View>
        <TitleBar title="注册成员" navigation={this.props.navigation}></TitleBar>
        <Text>RegisterPerson</Text>
      </View>
    );
  }
}
