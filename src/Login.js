import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    StatusBar,
    TouchableHighlight,
    AsyncStorage 
} from 'react-native';
import MainPage from './MainPage'
import { StackNavigator,
         NavigationActions } from 'react-navigation';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import { LOGIN_BY_PASSWORD, GET_USER_BY_ID } from './commons/Api';
import Storage from 'react-native-storage';


var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
  
    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
      
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,
      
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
      
    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // 或是写到另一个文件里，这里require引入
    // sync: require('你可以另外写一个文件专门处理sync')  
        
})

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
                
                // this.setState({
                //     hotComments: [...hotComments, ...(data.hotComments || [])],
                //     comments: [...comments, ...data.comments],
                //     offset: offset + 20,
                //     commentsTotal: data.total,
                //     refreshing: false,
                //     footerText: data.comments.length > 0 ? '数据加载中' : '我是有底线的'
                // })
                storage.save({
                    key: 'user',  // 注意:请不要在key中使用_下划线符号!
                    data: {
                      token: data.token
                    },
                    
                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    expires: 1000 * 3600
                  });
                //   console.log(data.token);
                
                this.toLoad();
            } catch (err) {
                console.log(err)
            }
        })();
    };

    toLoad() {
        console.log(1);
        // 读取
        storage.load({
            key: 'user',
            
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            // autoSync: true,
            
            // // syncInBackground(默认为true)意味着如果数据过期，
            // // 在调用sync方法的同时先返回已经过期的数据。
            // // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            // syncInBackground: true,
            
            // // 你还可以给sync方法传递额外的参数
            // syncParams: {
            // extraFetchOptions: {
            // // 各种参数
            // },
            // someFlag: true,
            // },
            
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            console.log(1);
            console.log(ret.token);
            // this.setState({ user: ret });
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
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
        this.fetchLogin();
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