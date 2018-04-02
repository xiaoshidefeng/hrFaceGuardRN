import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableNativeFeedback
} from 'react-native';
import QrScanView from './QrScanView';


export default class TitleBar extends Component {
    constructor(props) {
        super(props);
    }

    toQrScan() {
        this.props.navigation.navigate('QrScanView');
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#1C86EE'}/>

                <View style={styles.text_warpper}>
                    <Text style={{fontSize: 20, color: '#fff', paddingBottom: 10}}>{this.props.title}</Text>
                </View>
                <TouchableNativeFeedback onPress={() => this.toQrScan()}>
                    <View style={styles.qr_warpper}>
                        <Image style={styles.img_style}
                            //    source={require('./img/qrscan.png')}
                            source={{uri: 'http://otj6w86xd.bkt.clouddn.com/qrscan.png'}}
                            
                        />
                    </View>
                </TouchableNativeFeedback>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C86EE',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
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
