import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import TitleBar from './TitleBar';
import SettingsList from 'react-native-settings-list';

const list = [
    {
        name: 'Amy Farha',
        avatar_url: './head.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }
]

class Head extends Component {
    render() {
        return (
            <View style={ProfilePageStyle.container}>
                {/* <Image source={require('./img/head.jpg')} /> */}
                <View style={ProfilePageStyle.container_avater}>
                    <Image
                        style={ProfilePageStyle.img_avatar}
                        source={require('./img/png.png')}
                    />
                    <Text onPress={this.props.onNameClick}>胖虎</Text>
                </View>

            </View>
        )
    }
}
//
class SetList extends Component {
    render() {
        var bgColor = '#DCE3F4';
        return (
            <View style={{backgroundColor:'#f6f6f6', marginTop: 15}}>
            <View style={{backgroundColor:'#f6f6f6'}}>
              <SettingsList borderColor='#d6d5d9' defaultItemSize={50}>
                {/* <SettingsList.Item
                  hasNavArrow={false}
                  title='常用设置'
                  titleStyle={{color:'#009688', fontWeight:'500'}}
                  itemWidth={50}
                  borderHide={'Both'}
                /> */}
                <SettingsList.Item
                  icon={
                    <View style={ProfilePageStyle.imageStyle}>
                      <Image style={{alignSelf:'center',height:24, width:24, marginLeft: 14}} source={require('./img/ali/黑名单.png')}/>
                    </View>
                  }
                  hasNavArrow={true}
                  itemWidth={70}
                  titleStyle={{color:'black', fontSize: 16}}
                  title='黑名单'
                />
                <SettingsList.Item
                  icon={
                    <View style={ProfilePageStyle.imageStyle}>
                      <Image style={{alignSelf:'center',height:24, width:24, marginLeft: 14}} source={require('./img/ali/邮件.png')}/>
                    </View>
                  }
                  hasNavArrow={true}                  
                  title='消息'
                  itemWidth={70}
                  titleStyle={{color:'black', fontSize: 16}}
                  hasNavArrow={false}
                />
                <SettingsList.Item
                  icon={
                    <View style={ProfilePageStyle.imageStyle}>
                      <Image style={{alignSelf:'center',height:24, width:24, marginLeft: 14}} source={require('./img/ali/设置.png')}/>
                    </View>
                  }
                  hasNavArrow={true}                  
                  title='设置'
                  itemWidth={70}
                  titleStyle={{color:'black', fontSize: 16}}
                  hasNavArrow={false}
                />
              </SettingsList>
            </View>
          </View>
        )
    }
}


export default class Me extends Component {

    static  navigationOptions = {
        // header: null
        // title: '我'
    };

    render() {
        var bgColor = '#DCE3F4';
        return (
            <View>
                <TitleBar title="我" navigation={this.props.navigation}></TitleBar>
                <Head></Head>
                <SetList></SetList>
            </View>

        );
    }
}


const ProfilePageStyle = StyleSheet.create({
    container: {
        paddingBottom: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#B5B5B5',
        backgroundColor: 'white',
    },
    container_favority_and_reply: {
        flexDirection: 'row',
    },
    container_favority: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.5,
        borderRightColor: '#B5B5B5'
    },
    container_reply: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container_avater: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 26,
    },
    header: {
        backgroundColor: '#333333',
        height: 240,
    },
    btn_setting: {
        height: 40,
        width: 40,
    },
    img_avatar: {
        borderRadius: 80,
        height: 120,
        width: 120,
        marginBottom: 16,
    },
    tv_favority: {
        color: '#888888',
    },
    tv_reply: {
        color: '#888888',
    },
    img_favority: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 8,
    },
    img_reply: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 8,
    },
    tv_myItem: {
        height: 80,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    imageStyle:{
        marginLeft:15,
        marginRight:20,
        alignSelf:'center',
        width:20,
        height:24,
        justifyContent:'center'
      },
    titleInfoStyle:{
        fontSize:16,
        color: '#8e8e93'
    }

})
