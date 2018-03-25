import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TitleBar from './TitleBar';
import CodeInput from 'react-native-confirmation-code-input';
import { Button } from 'react-native-elements';

export default class ConfirmCode extends Component {


  permit() {

  }

  checkNumberLegal() {

  }

  render() {
    return (    
      <View style={styles.container}>
        <TitleBar title="验证码"></TitleBar>
        <View style={{height: 80}}></View>
        <CodeInput
          ref="codeInputRef2"
          keyboardType="numeric"
          // activeColor='rgba(255, 255, 255, 1)'
          // inactiveColor='rgba(255, 255, 255, 1)'
          activeColor='rgba(49, 180, 4, 1)'
          inactiveColor='rgba(49, 180, 4, 0.6)'
          autoFocus={false}
          ignoreCase={true}
          inputPosition='center'
          codeLength={4}
          size={50}
          onFulfill={(isValid) => this.checkNumberLegal(isValid)}
          containerStyle={{ marginTop: 30 }}
          codeInputStyle={{ borderWidth: 1.5 }}
        />
        <Button
          title='暂时授权'
          style={styles.ConfirmBtn}
          borderRadius={10}
          fontSize={18}
          // loading={logining}
          onPress={() => this.permit()} /> 
      </View>  
       
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F8F1'
    
  },
  ConfirmBtn: {
    marginTop: 50,
    backgroundColor:  '#009C92',
    paddingBottom: 30
  }

})