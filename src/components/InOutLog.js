import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  object,
  Image,
  RefreshControl,
  ActivityIndicator
  
} from 'react-native';
import { StackNavigator } from 'react-navigation';
// import { List, ListItem } from 'react-native-elements';
import {GET_IN_OUT_LOG_BY_ADDRESS,BASE_URL} from '../commons/Api';
import Toast, {DURATION} from 'react-native-easy-toast'
import Storage from 'react-native-storage';
import Timeline from 'react-native-timeline-listview';
import TitleBar from './TitleBar';



export default class InOutLog extends Component {
  constructor(props) {
    super(props);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.data = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    ]
  }
  state = {
    userid: 1,
    list: [],
    token: '',
    isRefreshing: false,      
    waiting: false,
  }

  componentWillMount() {
    
  }
  componentDidMount() {
    this.loadUserInfo(); 
  }


  onRefresh(){
    this.setState({isRefreshing: true});
    //refresh to initial data
    this.fetchInOutList();    
    setTimeout(() => {
      //refresh to initial data
      // this.setState({
      //   data: this.data,
      //   isRefreshing: false
      // });
    }, 2000);
  }

  onEndReached() {
    if (!this.state.waiting) {
        this.setState({waiting: true});
        this.fetchInOutList();

        //fetch and concat data
        setTimeout(() => {

          // this.setState({
          //   waiting: false,
          //   data: data,
          // });
        }, 2000);
    }
  }

  renderFooter() {
    if (this.state.waiting) {
        return <ActivityIndicator />;
    } else {
        return <Text>~</Text>;
    }
  }

  fetchInOutList = () => {
    (async () => {
        try {        
            const resC = await fetch(GET_IN_OUT_LOG_BY_ADDRESS + '1' + '/visits', {
              method: 'GET',
              headers: {
                  'Authorization': this.state.token
              }
            }); 
            const data = await resC.json();
            var logList = data.data;

            // bug 在这里
            var lists = '[';
            lists[0].name = "123";
            console.log('lists');
            lists = lists + "{ \"" + "time" + "\":" + "\"" + logList[0].visit_time + "\" , ";
            lists = lists + "\"" + "title" + "\":" + "\"" + logList[0].nickname + "\" , "; 
            lists = lists + "\"" + "imageUrl" + "\":" + "\"" + BASE_URL + "/" + logList[0].pic + "\","; 
            lists = lists + "\"" + "description" + "\":" + "\"" + logList[0].result + "\"";
            if (logList[0].result == '通过') {
              lists = lists + " , \"" + "circleColor" + "\":" + "\"" + "#00BFFF" + "\" , ";
              lists = lists + "\"" + "lineColor" + "\":" + "\"" + "#00BFFF" + "\"";             
            } else {
              lists = lists + " , \"" + "circleColor" + "\":" + "\"" + "#FF4500" + "\" , ";
              lists = lists + "\"" + "lineColor" + "\":" + "\"" + "#FF4500" + "\"";    
            }
            lists = lists +　" }"
            for (var i = 1, l = logList.length; i < l; i++) {
              lists = lists + ",{ \"" + "time" + "\":" + "\"" + logList[i].visit_time + "\" , ";
              lists = lists + "\"" + "title" + "\":" + "\"" + logList[i].nickname + "\" , "; 
              lists = lists + "\"" + "imageUrl" + "\":" + "\"" + BASE_URL + "/" + logList[i].pic + "\" , ";
              lists = lists + "\"" + "description" + "\":" + "\"" + logList[i].result + "\"";   
              if (logList[i].result == '通过') {
                lists = lists + ",\"" + "circleColor" + "\":" + "\"" + "#00BFFF" + "\" , ";
                lists = lists + "\"" + "lineColor" + "\":" + "\"" + "#00BFFF" + "\"  "; 
              } else {
                lists = lists + ",\"" + "circleColor" + "\":" + "\"" + "#FF4500" + "\" , ";
                lists = lists + "\"" + "lineColor" + "\":" + "\"" + "#FF4500" + "\"";             
              }            
              lists = lists +　" }"
            }
            console.log(lists);

            lists = lists +　"]";
            var jlist = JSON.parse(lists);            
            console.log(jlist);
            this.setState({isRefreshing: false});
            this.setState({waiting: false});            
            this.setState({list: jlist});
        } catch (err) {
          this.refs.toast.show('获取进出信息失败');                
          console.log(err);         
        }
    })();
  };

  loadUserInfo() {
    this.setState({isRefreshing: true});
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
      console.log('token success' + ret.token);      
      this.setState({token: ret.token});
      this.fetchInOutList();
    }).catch(err => {
      this.refs.toast.show('获取用户信息失败');      
      console.log('token err' + err.message);
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

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>
    var desc = null
    if(rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>   
          <Image source={{uri: rowData.imageUrl}} style={styles.image}/>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      )
    
    return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.cover}>
      <TitleBar title="进出情况" navigation={this.props.navigation}></TitleBar>
      <View style={styles.container}>
        <Timeline
          style={styles.list}
          data={this.state.list}
          circleSize={20}
          enableEmptySections={true}
          circleColor='rgba(0,0,0,0)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: 0}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            refreshControl: (
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            ),
            // renderFooter: this.renderFooter,
            onEndReached: this.onEndReached
          }}
          columnFormat='two-column'
          renderDetail={this.renderDetail}
          separator={false}
          detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#BBDAFF", borderRadius: 10}}
        />
      <Toast ref="toast"/>
      </View>
      </View>

           
    );
  }
}

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    backgroundColor:'white'
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,    
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
  title:{
    fontSize:16,
    fontWeight: 'bold'
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 50
  },
  image:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  }
});