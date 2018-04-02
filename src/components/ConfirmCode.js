import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    TouchableOpacity,
    
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import TitleBar from './TitleBar';
import CodeInput from 'react-native-confirmation-code-input';
import {Button} from 'react-native-elements';
import {GET_IMG_BY_CODE, BASE_URL, GATE_CONTROL, CNANGE_STATE} from '../commons/Api';
import PopupDialog,
{
    SlideAnimation,
    ScaleAnimation,
    DialogTitle,
    DialogButton,
} from 'react-native-popup-dialog';
import JPushModule from 'jpush-react-native';

const slideAnimation = new SlideAnimation({slideFrom: 'bottom'});
const scaleAnimation = new ScaleAnimation();

export default class ConfirmCode extends Component {
    constructor(props) {
        super(props);
        navigation = this.props.navigation;
    }

    state = {
        imgurl: "./img/head.jpg",
        dialogShow: false,
        pushMsg: ''
    }

    // example
    componentDidMount() {
        JPushModule.notifyJSDidLoad((resultCode) => {
            // do something
            console.log("receive notifyJSDidLoad: " + resultCode);
        });
        JPushModule.addReceiveCustomMsgListener((message) => {
            this.setState({pushMsg: message});
        });
        JPushModule.addReceiveNotificationListener((message) => {
            console.log("receive notification: " + message);
            this.showWebViewDialog.show();
        })
    }

    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();

    }

    permit() {
        console.log('permit');
    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }

    showWebViewDialog() {
        this.showWebViewDialog.show();
    }

    checkNumberLegal(isValid) {
        this.toFetchImg(isValid);
    }

    toFetchImg(isValid) {

        (async () => {
            try {

                const resC = await fetch(GET_IMG_BY_CODE + isValid);

                const data = await resC.json();
                if (data.success) {
                    this.setState({imgurl: BASE_URL + "/" + data.data.pic});
                    this.setState({user_id: data.data.user_id});
                }
                this.scaleAnimationDialog.dismiss();
                this.showWebViewDialog.dismiss();
                return true;

            } catch (err) {
                console.log(err);
                this.refs.toast.show('图片获取失败失败');
            }
        })();
    }

    toFetchConfirmCode() {

        let formData = new FormData();
        formData.append("type", "open");
        formData.append("building_id", "1");

        (async () => {
            try {
                const resC = await fetch(GATE_CONTROL, {
                    method: 'POST',
                    // headers: {
                    //     'Accept': 'application/json',
                    //     'Content-Type': 'application/json',
                    // },
                    body: formData
                });
                // const data = await resC.json();
                this.scaleAnimationDialog.dismiss();
                this.showWebViewDialog.dismiss();

                return true;

            } catch (err) {
                console.log(err)
                this.setState({logining: false});
                this.refs.toast.show('授权失败');
            }
        })();
    }

    toFetchState() {

        let formData = new FormData();
        formData.append("user_id", this.state.user_id);
        formData.append("address_id", "1");

        (async () => {
            try {
                const resC = await fetch(CNANGE_STATE, {
                    method: 'POST',
                    // headers: {
                    //     'Accept': 'application/json',
                    //     'Content-Type': 'application/json',
                    // },
                    body: formData
                });
                // const data = await resC.json();
                this.scaleAnimationDialog.dismiss();
                this.showWebViewDialog.dismiss();

                return true;

            } catch (err) {
                console.log(err)
                this.setState({logining: false});
                this.refs.toast.show('授权失败');
            }
        })();
    }


    render() {
        return (
            <View style={styles.container}>
                <TitleBar title="验证码" navigation={this.props.navigation}></TitleBar>
                <View style={{flex: 1, justifyContent:'center'}}>
                    <CodeInput
                        ref="codeInputRef2"
                        keyboardType="numeric"
                        activeColor='rgba(49, 180, 4, 1)'
                        inactiveColor='rgba(49, 180, 4, 0.6)'
                        autoFocus={false}
                        ignoreCase={true}
                        inputPosition='center'
                        codeLength={4}
                        size={50}
                        onFulfill={(isValid) => this.checkNumberLegal(isValid)}
                        containerStyle={{marginTop: 100}}
                        codeInputStyle={{borderWidth: 1.5}}
                    />
                </View>
                <View style={{flex: 1, justifyContent:'center', flexDirection:'row'}}>
                    <TouchableOpacity
                    onPress={() => {
                        this.showScaleAnimationDialog();
                    }}
                    >
                        
                    <Image style={{height:150, width:150,justifyContent:'center'}}
                        source={{uri: 'http://otj6w86xd.bkt.clouddn.com/%E9%AA%8C%E8%AF%81.png'}}
                    />
                    <View style={{flexDirection:'row',flex: 1, justifyContent:'center',textAlign: 'center'}}>

                        <Text style={{fontSize:25}}>验  证</Text>
                    </View>
                    
                    </TouchableOpacity>

                    {/* <Button
                        title='暂时授权'
                        style={styles.ConfirmBtn}
                        borderRadius={100}
                        fontSize={18}
                        // loading={logining}
                        onPress={() => {
                            this.showScaleAnimationDialog();
                        }}/> */}

                </View>

                <PopupDialog
                    ref={(popupDialog) => {
                        this.scaleAnimationDialog = popupDialog;
                    }}
                    height={0.5}
                    dialogAnimation={scaleAnimation}
                    dialogTitle={<DialogTitle title="查看来访人员信息"/>}
                    actions={[
                        <View style={styles.dia_btn_warpper}
                              key="view-1">
                            <DialogButton
                                text="确认"
                                buttonStyle={styles.dia_btn}
                                onPress={() => {
                                    this.toFetchConfirmCode();

                                }}
                                key="button-1"
                            />
                            <DialogButton
                                text="关闭"
                                buttonStyle={styles.dia_btn}
                                onPress={() => {
                                    this.scaleAnimationDialog.dismiss();
                                }}
                                key="button-2"
                            />
                        </View>
                    ]}
                >
                    <View style={styles.person_warpper}>
                        <Image
                            style={styles.person_img}
                            source={{uri: this.state.imgurl}}/>
                    </View>
                </PopupDialog>


                <PopupDialog
                    ref={(popupDialog) => {
                        this.showWebViewDialog = popupDialog;
                    }}
                    height={0.7}
                    dialogAnimation={scaleAnimation}
                    dialogTitle={<DialogTitle title='查看视频'/>}
                    actions={[
                        <View style={styles.dia_btn_warpper}
                              key="view-2">
                            <DialogButton
                                text="确认"
                                buttonStyle={styles.dia_btn}
                                onPress={() => {
                                    this.toFetchConfirmCode();
                                }}
                                key="button-3"
                            />
                            <DialogButton
                                text="关闭"
                                buttonStyle={styles.dia_btn}
                                onPress={() => {
                                    this.showWebViewDialog.dismiss();
                                }}
                                key="button-4"
                            />
                        </View>
                    ]}
                >
                    <View style={{flex: 1}}>
                        <WebView
                            source={{uri: 'https://www.github.com'}}
                        />

                    </View>
                </PopupDialog>
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
        backgroundColor: '#009C92',
        width: 60

    },
    dia_btn_warpper: {
        flexDirection: 'row',
    },
    dia_btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'

    },
    person_warpper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    person_img: {
        // flex: 1,
        width: 100,
        height: 120,

    }

})