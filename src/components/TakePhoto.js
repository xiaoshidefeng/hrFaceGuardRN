'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import {LOGIN_BY_FACE} from '../commons/Api';
import { StackNavigator,
    NavigationActions } from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast';


export default class TakePhoto extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.front}
            flashMode={RNCamera.Constants.FlashMode.on}
            onFacesDetected={ this.faceFind()}
            onFaceDetectionError={this.faceFindError()}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <Toast ref="toast" 
            style={{backgroundColor:'grey'}}
            position='top' />
        
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> 登 录 </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  faceFindError() {
    console.log('未到人脸');
  }
  faceFind() {
      console.log('找到人脸');
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5};
      const data = await this.camera.takePictureAsync(options);
      this.toLogin(data);
    }
  };

  toLogin(file) {
    let formData = new FormData();  
    // this.setState({logining: true});
    console.log(file);
    let fileFormat = {uri: file.uri, type: 'multipart/form-data', name: 'image.jpg'};
    formData.append("file",fileFormat);     
    (async () => {
        console.log(LOGIN_BY_FACE);
        
        try {
            const resC = await fetch(LOGIN_BY_FACE, {
                method: 'POST',
                body: formData
            });
            console.log('data.success');     
            const data = await resC.json();
            console.log(data);           
            console.log(data.success);
            if (data.success) {
                storage.save({
                    key: 'user',  // 注意:请不要在key中使用_下划线符号!
                    data: { 
                      token: data.token
                    },
                    expires: 1000 * 3600
                });  
                let resetActions = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'MainPage'})]
                });
                console.log('登录成功');                
                this.props.navigation.dispatch(resetActions);
            } else {
                console.log('登录失败');                                
                this.refs.toast.show('登录失败 请重新拍照');
            }
            return true;

        } catch (err) {
            console.log(err)
            // this.setState({logining: false});
            // this.refs.toast.show('登录失败 请检查账号密码');
        }
    })();
    return false;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  toast_show: {
    // position: 'absolute',
    // bottom: 50
    alignItems: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

AppRegistry.registerComponent('BadInstagramCloneApp', () => BadInstagramCloneApp);