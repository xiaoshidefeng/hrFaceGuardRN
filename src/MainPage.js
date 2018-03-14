import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
} from 'react-native';
export default class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={styles.container}>
            <Text style={styles.textStyle}>欢迎来到主界面</Text>
            <Text style={styles.textStyle}>您当前的用户名是：{this.props.logNmae}</Text>
            <Text style={styles.textStyle}>您当前的密码是：{this.props.logPwd}</Text>
        </View>)
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
})