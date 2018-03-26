import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import Camera from 'react-native-camera';
import Toast, {DURATION} from 'react-native-easy-toast'
import QrScan from './QrScan';
// import BarcodeFinder from './comp/Bar';
// import Camera from './comp/BarFind'
import { StackNavigator,
    NavigationActions } from 'react-navigation';


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
  onBarCodeRead(data) {
    //将返回的结果转为对象
    // var result = JSON.parse(data.data);
    
    console.log('hello world!');
    console.log(data);
    this.props.navigation.goBack();
    // this.refs.toast.show('data');                
    
    
    }
  render() {
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
          permissionDialogTitle="Sample title"
          permissionDialogMessage="Sample dialog message"
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
              cornerColor={'#000fff'}
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