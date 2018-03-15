import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight
} from 'react-native';
import MainPage from './MainPage'
import { StackNavigator,
         NavigationActions } from 'react-navigation';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.loginInMainpage = this.loginInMainpage.bind(this);
    }

    static  navigationOptions = {
        title: '登录',
    };

    render() {
        return (<View style={styles.container}>
            <View style={styles.item}><Text style={styles.textStyle}>用户帐号：</Text>
                <TextInput
                    ref="inputLoginName"
                    autoFocus={true}
                    underlineColorAndroid="gray"
                    placeholder="请输入用户名"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                    style={{flex: 1}}
                    onChangeText={(input) => this.setState({username: input})}
                ></TextInput>
            </View>
            <View style={styles.item}><Text style={styles.textStyle}>用户密码：</Text>
                <TextInput
                    ref="inputLoginPwd"
                    underlineColorAndroid="gray"
                    placeholder="请输入密码"
                    clearTextOnFocus={true}
                    clearButtonMode="while-editing"
                    style={{flex: 1}}
                    onChangeText={(input) => this.setState({userpwd: input})}></TextInput>
            </View>
            <TouchableHighlight style={styles.login}
                                underlayColor='transparent'
                                onPress={() => this.loginInMainpage()}><Text
                style={styles.loginText}>登录</Text></TouchableHighlight>
        </View>)
    }

    /**
     * 登录进入主页面
     */
    loginInMainpage() {

        // 这里开始验证
        // let uName = this.state.username;
        // let uPwd = this.state.userpwd;

        resetActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'MainPage'})]
        });
        this.props.navigation.dispatch(resetActions);
        this.refs.inputLoginName.blur();
        this.refs.inputLoginPwd.blur();


    }

    setLoginName(input) {
        this.setState = {inputName: input}
    }

    setLoginPwd(input) {
        this.setState = {inputPwd: input}
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },
    login: {
        height: 40,
        backgroundColor: 'green',
        margin: 20,
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFF'
    }

})
const loginStack = StackNavigator({
    Login: { screen: Login },
    MainPage: {screen: MainPage}
  });
  
  AppRegistry.registerComponent('loginStack', () => App);