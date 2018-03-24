import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  
} from 'react-native';

export default class TitleBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#008B8B'} />
        <Text style={{fontSize: 20, color: '#fff', paddingBottom: 10}}>{this.props.title}</Text>
      </View>   
    );
  }
}

const styles = StyleSheet.create({
    container: {
      
      alignItems: 'center',
      justifyContent: 'center',
        backgroundColor: '#008B8B',
        height: 45,
    }

})