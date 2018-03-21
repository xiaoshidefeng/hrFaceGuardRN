import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
import ConfirmCode  from './components/ConfirmCode';
import InOutLog from './components/InOutLog';
import RegisterPerson from './components/RegisterPerson';
import Me from './components/Me';
import {TAB_SELECT_COLOR} from './commons/ColorUtil';

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}


export default class MainPage extends Component {
    constructor(props) {
        super(props);
    }
    state= {
        selectedTab: 'ConfirmCode',
    };
    static  navigationOptions = {
        header: null
      };
    // static navigationOptions = {
    //     title: 'main',
    //   };
    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                  selected={this.state.selectedTab === 'ConfirmCode'}
                  title="验证码"
                  selectedTitleStyle={{color: TAB_SELECT_COLOR}}
                  renderIcon={() => <Icon name={'key'} size={px2dp(22)} color="#666" />}
                  renderSelectedIcon={() => <Icon name={'key'} size={px2dp(22)} color="#3496f0"/>}
                  onPress={() => this.setState({selectedTab: 'ConfirmCode'})}>
                <ConfirmCode/>
                </TabNavigator.Item>
                <TabNavigator.Item
                  selected={this.state.selectedTab === 'InOutLog'}
                  title="进出情况"
                  badgeText="2"
                  selectedTitleStyle={{color: TAB_SELECT_COLOR}}
                  renderIcon={() => <Icon name="eye" size={px2dp(22)} color="#666"/>}
                  renderSelectedIcon={() => <Icon name="eye" size={px2dp(22)} color="#3496f0"/>}
                  onPress={() => this.setState({selectedTab: 'InOutLog'})}>
                <InOutLog/>
                </TabNavigator.Item>
                <TabNavigator.Item
                  selected={this.state.selectedTab === 'RegisterPerson'}
                  title="注册成员"
                  selectedTitleStyle={{color: TAB_SELECT_COLOR}}
                  renderIcon={() => <Icon name="users" size={px2dp(22)} color="#666"/>}
                  renderSelectedIcon={() => <Icon name="users" size={px2dp(22)} color="#3496f0"/>}
                  onPress={() => this.setState({selectedTab: 'RegisterPerson'})}>
                <RegisterPerson/>
                </TabNavigator.Item>
                <TabNavigator.Item
                  selected={this.state.selectedTab === 'Me'}
                  title="我"
                  selectedTitleStyle={{color: TAB_SELECT_COLOR}}
                  renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
                  renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
                  onPress={() => this.setState({selectedTab: 'Me'})}>
                <Me/>
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

// const mainStack = StackNavigator({
//   ConfirmCode: { screen: ConfirmCode },
//   InOutLog: {screen: InOutLog},
//   Me: {screen:　Me}
// });

// AppRegistry.registerComponent('mainStack', () => App);