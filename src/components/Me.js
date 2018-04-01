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
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableWithoutFeedback onPress={this.props.onSettingClick}>
                        <Image
                            source={require('./img/head.jpg')}
                            style={ProfilePageStyle.btn_setting}/>
                    </TouchableWithoutFeedback>

                </View>
                <View style={ProfilePageStyle.container_avater}>
                    <Image
                        style={ProfilePageStyle.img_avatar}
                        source={require('./img/png.png')}
                    />
                    <Text onPress={this.props.onNameClick}>胖虎</Text>
                </View>
                <View style={ProfilePageStyle.container_favority_and_reply}>
                    <TouchableWithoutFeedback onPress={this.props.onFavorityClick}>
                        <View style={ProfilePageStyle.container_favority}>
                            <Image
                                style={ProfilePageStyle.img_favority}
                                source={require('./img/head.jpg')}/>
                            <Text style={ProfilePageStyle.tv_favority}>收藏</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.props.onReplyClick}>
                        <View style={ProfilePageStyle.container_reply}>
                            <Image
                                style={ProfilePageStyle.img_reply}
                                source={require('./img/head.jpg')}/>
                            <Text style={ProfilePageStyle.tv_reply}>评论</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}
//
// class SetList extends Component {
//     render() {
//         var bgColor = '#DCE3F4';
//         return (
//             <View style={{backgroundColor:'#EFEFF4',flex:1}}>
//                 <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
//                     <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
//                 </View>
//                 <View style={{backgroundColor:'#EFEFF4',flex:1}}>
//                     <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
//                         <SettingsList.Header headerStyle={{marginTop:15}}/>
//                         <SettingsList.Item
//                             icon={<Image style={styles.imageStyle} source={require('./images/wifi.png')}/>}
//                             title='Wi-Fi'
//                             titleInfo='Bill Wi The Science Fi'
//                             titleInfoStyle={styles.titleInfoStyle}
//                             onPress={() => Alert.alert('Route to Wifi Page')}
//                         />
//                         <SettingsList.Item
//                             icon={<Image style={styles.imageStyle} source={require('./images/blutooth.png')}/>}
//                             title='Blutooth'
//                             titleInfo='Off'
//                             titleInfoStyle={styles.titleInfoStyle}
//                             onPress={() => Alert.alert('Route to Blutooth Page')}
//                         />
//                         <SettingsList.Item
//                             icon={<Image style={styles.imageStyle} source={require('./images/cellular.png')}/>}
//                             title='Cellular'
//                             onPress={() => Alert.alert('Route To Cellular Page')}
//                         />
//                         <SettingsList.Item
//                             icon={<Image style={styles.imageStyle} source={require('./images/hotspot.png')}/>}
//                             title='Personal Hotspot'
//                             titleInfo='Off'
//                             titleInfoStyle={styles.titleInfoStyle}
//                             onPress={() => Alert.alert('Route To Hotspot Page')}
//                         />
//                         <SettingsList.Header headerStyle={{marginTop:15}}/>
//                         <SettingsList.Item
//                             icon={<Image style={styles.imageStyle} source={require('./images/notifications.png')}/>}
//                             title='Notifications'
//                             onPress={() => Alert.alert('Route To Notifications Page')}
//                         />
//                         <SettingsList.Item
//                             icon={<Image style={styles.imageStyle} source={require('./images/control.png')}/>}
//                             title='Control Center'
//                             onPress={() => Alert.alert('Route To Control Center Page')}
//                         />
//                         <SettingsList.Item
//                             icon={<Image style={styles.imageStyle} source={require('./images/dnd.png')}/>}
//                             title='Do Not Disturb'
//                             onPress={() => Alert.alert('Route To Do Not Disturb Page')}
//                         />
//                         <SettingsList.Header headerStyle={{marginTop:15}}/>
//                         <SettingsList.Item
//                             icon={<Image style={styles.imageStyle} source={require('./images/general.png')}/>}
//                             title='General'
//                             onPress={() => Alert.alert('Route To General Page')}
//                         />
//                         <SettingsList.Item
//                             icon={<Image style={styles.imageStyle} source={require('./images/display.png')}/>}
//                             title='Display & Brightness'
//                             onPress={() => Alert.alert('Route To Display Page')}
//                         />
//                     </SettingsList>
//                 </View>
//             </View>
//         )
//     }
// }


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
                {/*<SetList></SetList>*/}

                {/*<View style={{backgroundColor:'#EFEFF4',flex:1}}>*/}
                    {/*<View style={{backgroundColor:'#EFEFF4',flex:1}}>*/}
                        {/*<SettingsList borderColor='#c8c7cc' defaultItemSize={50}>*/}
                            {/*<SettingsList.Header headerStyle={{marginTop:15}}/>*/}
                            {/*<SettingsList.Item*/}
                                {/*// icon={<Image style={ProfilePageStyle.imageStyle} source={require('./images/wifi.png')}/>}*/}
                                {/*title='Wi-Fi'*/}
                                {/*titleInfo='Bill Wi The Science Fi'*/}
                                {/*titleInfoStyle={ProfilePageStyle.titleInfoStyle}*/}
                            {/*/>*/}
                            {/*<SettingsList.Item*/}
                                {/*// icon={<Image style={ProfilePageStyle.imageStyle} source={require('./images/blutooth.png')}/>}*/}
                                {/*title='Blutooth'*/}
                                {/*titleInfo='Off'*/}
                                {/*titleInfoStyle={ProfilePageStyle.titleInfoStyle}*/}
                            {/*/>*/}
                        {/*</SettingsList>*/}
                    {/*</View>*/}
                {/*</View>*/}
                )
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
        marginBottom: 32,
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
        alignSelf:'center',
        height:30,
        width:30
    },
    titleInfoStyle:{
        fontSize:16,
        color: '#8e8e93'
    }

})
