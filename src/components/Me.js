import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { StackNavigator,
  NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import TitleBar from './TitleBar';

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
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
        return(
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

class SetList extends Component {
    render() {
        return (
            <View style={{ marginTop: 10}}>
            <List containerStyle={{ marginTop: 5}}>
            {
                list.map((l, i) => (
                    <ListItem
                    roundAvatar
                    avatar={{uri:l.avatar_url}}
                    key={i}
                    title={l.name}
                    subtitle={
                        <View>
                        {/* <Image source={require('../images/rating.png')} style={styles.ratingImage}/> */}
                        <Text>5 months ago</Text>
                        </View>
                    }
                />
                ))
            }
            </List>
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
    return (
        <View>
            <TitleBar title="我"></TitleBar>
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
      height: 80,
      width: 80,
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
})