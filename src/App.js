/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './Login';
import MainPage from './MainPage'
import { StackNavigator } from 'react-navigation';


export default App = StackNavigator({
  Login: { screen: Login},
  MainPage: { screen: MainPage}
});