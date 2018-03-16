import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    StatusBar,
    TouchableHighlight
} from 'react-native';
import MainPage from './MainPage'
import { StackNavigator,
         NavigationActions } from 'react-navigation';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import NetUtil from './commons/NetUtil';
import { LOGIN_BY_PASSWORD, GET_USER_BY_ID } from './commons/Api';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.loginInMainpage = this.loginInMainpage.bind(this);
    }

    static  navigationOptions = {
        header: null
    };

    state = {
        logining:false,
    }

    render() {
        const {logining} = this.state;
        return (
        <View style={styles.container}>
        <StatusBar backgroundColor={'#008B8B'} />
            <View style={styles.warpper}>
                <Sae
                    label={'账 号'}
                    iconClass={FontAwesomeIcon}
                    iconName={'pencil'}
                    iconColor={'white'}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    labelStyle={{ color: '#ffffff' }}
                />
                <Sae
                    label={'密 码'}
                    iconClass={FontAwesomeIcon}
                    iconName={'pencil'}
                    iconColor={'white'}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    labelStyle={{ color: '#ffffff' }}
                    secureTextEntry={true} 
                />
                <View style={{height:50}}></View>

                <Button
                    title='登录'
                    style={styles.loginBtn}
                    borderRadius={10}
                    fontSize={18}
                    loading={logining}
                    onPress={() => this.loginInMainpage()} />  
            </View>
        </View>
    )
    }

    fetchLogin = () => {
        // const { id } = this.props.navigation.state.params;
        // const { offset, comments, hotComments } = this.state;
        let formData = new FormData();  
        formData.append("email","test@qq.com");
        formData.append("password","123456");        
        this.setState({logining: true});
        
        (async () => {
            try {
                // 评论
                console.log(LOGIN_BY_PASSWORD);
                const resC = await fetch(LOGIN_BY_PASSWORD, {
                    method: 'POST',
                    // headers: {
                    //     'Accept': 'application/json',
                    //     'Content-Type': 'application/json',
                    // },
                    body: formData
                });
                const data = await resC.json();
                console.log(data);
                // this.setState({
                //     hotComments: [...hotComments, ...(data.hotComments || [])],
                //     comments: [...comments, ...data.comments],
                //     offset: offset + 20,
                //     commentsTotal: data.total,
                //     refreshing: false,
                //     footerText: data.comments.length > 0 ? '数据加载中' : '我是有底线的'
                // })
            } catch (err) {
                console.log(err)
            }
        })();
    };

    fetchComment = () => {
        // const { id } = this.props.navigation.state.params;
        // const { offset, comments, hotComments } = this.state;
        // this.setState({refreshing: true});
        (async () => {
            try {
                // 评论
                console.log(GET_USER_BY_ID + '1');
                const resC = await fetch(GET_USER_BY_ID + '1');
                const data = await resC.json();
                console.log(data);
                // this.setState({
                //     hotComments: [...hotComments, ...(data.hotComments || [])],
                //     comments: [...comments, ...data.comments],
                //     offset: offset + 20,
                //     commentsTotal: data.total,
                //     refreshing: false,
                //     footerText: data.comments.length > 0 ? '数据加载中' : '我是有底线的'
                // })
            } catch (err) {
                console.log(err)
            }
        })();
    };

    /**
     * 登录进入主页面
     */
    loginInMainpage() {

        // 这里开始验证
        // let uName = this.state.username;
        // let uPwd = this.state.userpwd;

        // this.fetchComment();
        // this.fetchLogin();
        // NetUtil.get("http://10.30.90.16:8000/api/v1/users/1",'',  function(set) {
        //     console.log(set);
        // });

        resetActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'MainPage'})]
        });
        this.props.navigation.dispatch(resetActions);

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
        justifyContent: 'center',
        backgroundColor: '#008B8B',

    },
    warpper: {
        justifyContent: 'center',
        padding: 16,
        flexDirection: 'column',
        
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
    loginBtn: {
        marginTop: 80
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