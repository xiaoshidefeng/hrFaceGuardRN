import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    StatusBar,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import MainPage from './MainPage';
import {
    NavigationActions
} from 'react-navigation';
import {Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {LOGIN_BY_PASSWORD, GET_USER_BY_ID} from './commons/Api';
import Toast, {DURATION} from 'react-native-easy-toast';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.loginInMainpage = this.loginInMainpage.bind(this);
    }

    static  navigationOptions = {
        header: null
    };

    state = {
        logining: false,
    }

    componentWillMount() {
        this.toLoad();
    }

    render() {
        const {logining} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#008B8B'}/>
                <TouchableWithoutFeedback onPress={() => this.toTakePhoto()}>
                    <View style={styles.img_facewarpper}>
                        <Image style={styles.img_face}
                               source={require('./components/img/face.png')}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.warpper}>
                    <Sae
                        label={'账 号'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'white'}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        labelStyle={{color: '#ffffff'}}
                    />
                    <Sae
                        label={'密 码'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'white'}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        labelStyle={{color: '#ffffff'}}
                        secureTextEntry={true}
                    />
                    <View style={{height: 50}}></View>

                    <Button
                        title='登 录'
                        style={styles.loginBtn}
                        borderRadius={10}
                        fontSize={18}
                        loading={logining}
                        onPress={() => this.loginInMainpage()}/>
                </View>
                <Toast ref="toast"/>
            </View>
        )
    }

    toTakePhoto() {
        this.props.navigation.navigate('TakePhoto');
    }

    gotoMainPage() {
        resetActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'MainPage'})]
        });
        this.props.navigation.dispatch(resetActions);
    }

    fetchLogin = () => {
        let formData = new FormData();
        formData.append("email", "test@qq.com");
        formData.append("password", "123456");
        this.setState({logining: true});

        (async () => {
            try {

                const resC = await fetch(LOGIN_BY_PASSWORD, {
                    method: 'POST',
                    body: formData
                });

                const data = await resC.json();
                storage.save({
                    key: 'user',  // 注意:请不要在key中使用_下划线符号!
                    data: {
                        token: data.token
                    },
                    expires: 1000 * 3600
                });
                this.gotoMainPage();

                return true;

            } catch (err) {
                console.log(err)
                this.setState({logining: false});
                this.refs.toast.show('登录失败 请检查账号密码');
            }
        })();
        return false;
    };

    toLoad() {
        console.log(1);
        // // 读取
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

            this.gotoMainPage();

        }).catch(err => {
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


    /**
     * 登录进入主页面
     */
    loginInMainpage() {
        // this.gotoMainPage();
        // 这里开始验证
        this.fetchLogin();
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
    img_facewarpper: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img_face: {
        height: 64,
        width: 64
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
