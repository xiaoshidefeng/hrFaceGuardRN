import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image
} from 'react-native';

export default class TitleBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#008B8B'} />
        
        <View style={styles.qr_warpper}>
          <Image style={styles.img_style}
                source={require('./img/block.png')} />
        </View>
        <View style={styles.text_warpper}>
        <Text style={{fontSize: 20, color: '#fff', paddingBottom: 10}}>{this.props.title}</Text>
        </View>
        <View style={styles.qr_warpper}>
          <Image style={styles.img_style}
                source={require('./img/qrscan.png')} />
        </View>
      </View>   
    );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#008B8B',
      height: 45,
      flexDirection:'row',
      justifyContent:'center',
    },
    text_warpper: {
      justifyContent: 'center'
    },
    qr_warpper: {
      position: 'absolute',
      top: 5,
      right: 15
    },
    img_style: {
      width: 25,
      height: 25,
    }

})