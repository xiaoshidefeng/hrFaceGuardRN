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
import Me from './components/Me';

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
        selectedTab: 'ConfirmCode'
    };
    // static navigationOptions = {
    //     title: 'main',
    //   };
    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                  selected={this.state.selectedTab === 'ConfirmCode'}
                  title="ConfirmCode"
                  selectedTitleStyle={{color: "#3496f0"}}
                  renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666"/>}
                  renderSelectedIcon={() => <Icon name="home" size={px2dp(22)} color="#3496f0"/>}
                  badgeText="1"
                  onPress={() => this.setState({selectedTab: 'ConfirmCode'})}>
                <ConfirmCode/>
                </TabNavigator.Item>
                <TabNavigator.Item
                  selected={this.state.selectedTab === 'InOutLog'}
                  title="InOutLog"
                  selectedTitleStyle={{color: "#3496f0"}}
                  renderIcon={() => <Icon name="users" size={px2dp(22)} color="#666"/>}
                  renderSelectedIcon={() => <Icon name="users" size={px2dp(22)} color="#3496f0"/>}
                  onPress={() => this.setState({selectedTab: 'InOutLog'})}>
                <InOutLog/>
                </TabNavigator.Item>
                <TabNavigator.Item
                  selected={this.state.selectedTab === 'Me'}
                  title="Me"
                  selectedTitleStyle={{color: "#3496f0"}}
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