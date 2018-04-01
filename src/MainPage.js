import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    BackHandler,
    AppState,
    ToastAndroid
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
import ConfirmCode from './components/ConfirmCode';
import InOutLog from './components/InOutLog';
import RegisterPerson from './components/RegisterPerson';
import Me from './components/Me';
import {TAB_SELECT_COLOR} from './commons/ColorUtil';

const deviceW = Dimensions.get('window').width

const basePx = 375

const lastBackPressed = Date.now();

function px2dp(px) {
    return px * deviceW / basePx
}


export default class MainPage extends Component {
    constructor(props) {
        super(props);
        navigation = this.props.navigation;
    }

    state = {
        selectedTab: 'ConfirmCode',
        userid: 1,

    };
    static  navigationOptions = {
        header: null
    };

    componentWillMount() {
        this.fetchUserInfo();
    }

    componentDidMount() {
        if (Platform.OS === 'android') BackHandler.addEventListener('hardwareBackPress', this._onBackPressed);
        AppState.addEventListener('change', this._onAppStateChanged);
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress', this._onBackPressed);
        AppState.removeEventListener('change', this._onAppStateChanged);
    }

    fetchUserInfo() {

    };

    _onBackPressed() {
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
            BackHandler.exitApp();
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }

    _onAppStateChanged() {
        switch (AppState.currentState) {
            case "active":
                console.log("active");
                break;
            case "background":
                console.log("background");
                break;
            default:

        }
    }

    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'ConfirmCode'}
                    title="验证码"
                    selectedTitleStyle={{color: TAB_SELECT_COLOR}}
                    renderIcon={() => <Icon name={'key'} size={px2dp(22)} color="#666"/>}
                    renderSelectedIcon={() => <Icon name={'key'} size={px2dp(22)} color="#3496f0"/>}
                    onPress={() => this.setState({selectedTab: 'ConfirmCode'})}>
                    <ConfirmCode navigation={this.props.navigation}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'InOutLog'}
                    title="进出情况"
                    badgeText="2"
                    selectedTitleStyle={{color: TAB_SELECT_COLOR}}
                    renderIcon={() => <Icon name="eye" size={px2dp(22)} color="#666"/>}
                    renderSelectedIcon={() => <Icon name="eye" size={px2dp(22)} color="#3496f0"/>}
                    onPress={() => this.setState({selectedTab: 'InOutLog'})}>
                    <InOutLog navigation={this.props.navigation}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'RegisterPerson'}
                    title="注册成员"
                    selectedTitleStyle={{color: TAB_SELECT_COLOR}}
                    renderIcon={() => <Icon name="users" size={px2dp(22)} color="#666"/>}
                    renderSelectedIcon={() => <Icon name="users" size={px2dp(22)} color="#3496f0"/>}
                    onPress={() => this.setState({selectedTab: 'RegisterPerson'})}>
                    <RegisterPerson navigation={this.props.navigation}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Me'}
                    title="我"
                    selectedTitleStyle={{color: TAB_SELECT_COLOR}}
                    renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
                    renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
                    onPress={() => this.setState({selectedTab: 'Me'})}>
                    <Me navigation={this.props.navigation}/>
                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})
