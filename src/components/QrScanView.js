import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import Camera from 'react-native-camera';
import Toast, {DURATION} from 'react-native-easy-toast'
import QrScan from './QrScan';
// import BarcodeFinder from './comp/Bar';
// import Camera from './comp/BarFind'
import { StackNavigator,
    NavigationActions } from 'react-navigation';
import {PASS_BY_QRCODE} from '../commons/Api';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});

export default class QrScanView extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false,
      token: ''
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera
        .capture()
        .then(data => console.log(data))
        .catch(err => console.error(err));
    }
  };

  startRecording = () => {
    if (this.camera) {
      this.camera
        .capture({ mode: Camera.constants.CaptureMode.video })
        .then(data => console.log(data))
        .catch(err => console.error(err));
      this.setState({
        isRecording: true,
      });
    }
  };

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false,
      });
    }
  };

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  };

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('./assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('./assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      }
    });
  };

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('./assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('./assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('./assets/ic_flash_off_white.png');
    }

    return icon;
  }
  onBarCodeRead = (data)  => {
    //将返回的结果转为对象
    // var result = JSON.parse(data.data);
    if (data.type == 'QR_CODE') {
      console.log(data.data);
      // navigation.navigate.goBack();

      // this.goBack();
      this.toConfirm(data.data);
    }

    // this.props.navigation.goBack();
    // this.refs.toast.show('data');                
    
    
  }

  toConfirm(code) {
    // this.setState({logining: true});

    storage.load({
      key: 'user',
      
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: true,
      
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: true,
      
      // 你还可以给sync方法传递额外的参数
      syncParams: {
        extraFetchOptions: {
          // 各种参数
        },
        someFlag: true,
      },
    }).then(ret => {
      console.log('token success' + ret.token);      
      this.setState({token: ret.token});
      console.log(code + '111111111');
      this.toFetchCode(code);
      
    }).catch(err => {
      this.refs.toast.show('获取用户信息失败');      
      console.log('token err' + err.message);
      switch (err.name) {
          case 'NotFoundError':
              // TODO;
              break;
          case 'ExpiredError':
              // TODO
              break;
      }
    })

  }

  toFetchCode(code) {
    let formData = new FormData();  
    formData.append("uuid",code);  
    (async () => {
      try {
          const resC = await fetch(PASS_BY_QRCODE, {
              method: 'POST',
              headers: {
                'Authorization': this.state.token
              },
              body: formData
          });
          // const data = await resC.json();
          // console.log(data);
          resetActions = NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'MainPage'})]
          });
          console.log('123');                
          this.props.navigation.dispatch(resetActions);
          // this.toLoad();
          return true;

      } catch (err) {
          console.log(err)
          // this.setState({logining: false});
          this.refs.toast.show('扫码失败');
      }
  })();
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
          cropToPreview={false}
          permissionDialogTitle="相机权限请求"
          permissionDialogMessage="请打开相机权限"
          onBarCodeRead={this.onBarCodeRead}
          // barcodeFinderVisible={true}
					// barcodeFinderWidth={290}
					// barcodeFinderHeight={290}
					// barcodeFinderBorderColor="red"
					// barcodeFinderBorderWidth={2}
        >
          <QrScan
              cornerBorderLength={40}
              cornerBorderWidth={4}
              rectWidth={280}
              rectHeight={280}
              scanBarImage={null}
              cornerColor={'#008B8B'}
              cornerOffsetSize={0}
              borderWidth={0}
              hintText={'我的二维码'}
              hintTextStyle={{
                  color: '#fff',
                  fontSize: 16,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 32,
                  paddingRight: 32,
                  borderRadius: 4,
              }}
              hintTextPosition={70}
              maskColor={'#0000004D'}
              bottomMenuHeight={80}
              bottomMenuStyle={{backgroundColor:'#0000004D',height:80}}
              onScanResultReceived={this.onBarCodeRead.bind(this)}
              isShowScanBar={true}
              
              ></QrScan>

        </Camera>
        <Toast ref="toast"/>
      </View>
    );
  }
}