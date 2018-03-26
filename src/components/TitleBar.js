import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  AppRegistry,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { StackNavigator,
  NavigationActions } from 'react-navigation';
import QrScanView from './QrScanView';



export default class TitleBar extends Component {
  constructor(props) {
    super(props);
  }
  toQrScan() {
    // resetActions = NavigationActions.reset({
    //     index: 1,
    //     actions: [NavigationActions.navigate({routeName: 'QrScanView'})]
    // });
    // this.props.navigation('Login');
    console.log('click1');
    
    this.props.navigation.navigate('QrScanView'); 
    // this.props.navigation.navigate('resetActions');
    console.log('click');
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#008B8B'} />
        
        {/* <View style={styles.qr_warpper}>
          <Image style={styles.img_style}
                source={require('./img/block.png')} />
        </View> */}
        <View style={styles.text_warpper}>
        <Text style={{fontSize: 20, color: '#fff', paddingBottom: 10}}>{this.props.title}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => this.toQrScan()}>
          <View style={styles.qr_warpper}>
            <Image style={styles.img_style}
                  source={require('./img/qrscan.png')}
                  />
          </View>
        </TouchableWithoutFeedback>

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

// const QrStack = StackNavigator({
//   QrScanView: { screen: QrScanView },
//   TitleBar: { screen: TitleBar }
  
// });

// AppRegistry.registerComponent('QrStack', () => App);