import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TitleBar from './TitleBar';

export default class ConfirmCode extends Component {
  render() {
    return (    
      <View>
        <TitleBar title="验证码"></TitleBar>
        <Text>ConfirmCode</Text>
      </View>  
    );
  }
}
