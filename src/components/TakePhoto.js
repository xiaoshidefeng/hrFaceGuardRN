'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {LOGIN_BY_FACE} from '../commons/Api';
import {
    StackNavigator,
    NavigationActions
} from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';


export default class TakePhoto extends Component {

    state={
        visible: false
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <View style={{ flex: 1 }}> */}
                    <Spinner visible={this.state.visible} textContent={"正在登录..."} textStyle={{color: '#FFF'}} />
                {/* </View> */}
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.front}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onFacesDetected={this.faceFind()}
                    onFaceDetectionError={this.faceFindError()}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <Toast ref="toast"
                       style={{backgroundColor: 'grey'}}
                       position='top'/>

                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={styles.capture}
                    >
                    <Image style={{height:50, width: 50}} 
                        source={{uri:'http://otj6w86xd.bkt.clouddn.com/facebtn.png'}}
                    />
                        <Text style={{fontSize: 14, color:'#fff', textAlign:'center'}}> 登   录 </Text>
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

    takePicture = async function () {
        this.setState({
            visible: true
          });
        if (this.camera) {
            const options = {quality: 0.5};
            const data = await this.camera.takePictureAsync(options);
            this.toLogin(data);
        }
    };

    toLogin(file) {
        let formData = new FormData();
        let fileFormat = {uri: file.uri, type: 'multipart/form-data', name: 'image.jpg'};
        formData.append("file", fileFormat);
        (async () => {

            try {
                const resC = await fetch(LOGIN_BY_FACE, {
                    method: 'POST',
                    body: formData
                });
                const data = await resC.json();
                if (data.success) {
                    storage.save({
                        key: 'user',  // 注意:请不要在key中使用_下划线符号!
                        data: {
                            token: data.token
                        },
                        expires: 1000 * 3600
                    });
                    this.setState({
                        visible: false
                      });
                    let resetActions = NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'MainPage'})]
                    });
                    this.props.navigation.dispatch(resetActions);
                } else {
                    this.refs.toast.show('登录失败 请重新拍照');
                }
                return true;

            } catch (err) {
                console.log(err)
                // this.setState({logining: false});
                this.refs.toast.show('登录失败 请重新拍照');
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
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
    }
});

AppRegistry.registerComponent('BadInstagramCloneApp', () => BadInstagramCloneApp);