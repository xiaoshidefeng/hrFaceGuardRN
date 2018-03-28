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
  ActivityIndicator,
  TouchableWithoutFeedback,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  CheckBox
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {GET_IN_OUT_LOG_BY_ADDRESS,BASE_URL} from '../commons/Api';
import Toast, {DURATION} from 'react-native-easy-toast'
import Storage from 'react-native-storage';
import Timeline from 'react-native-timeline-listview';
import TitleBar from './TitleBar';
import PopupDialog, 
      { SlideAnimation,
        ScaleAnimation,  
        DialogTitle,
        DialogButton, } from 'react-native-popup-dialog';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'
// import {weekData} from './data/WeekData';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...'
  }
];
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4

export const weekDatas = [
  '取消',
  {
      component: 
      <View style={{flexDirection: 'row', }}>
          <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>全选</Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <CheckBox ></CheckBox>
          </View>
      </View> ,
      height: 36,
  },
  {
      component: 
      <View style={{flexDirection: 'row', }}>
          <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期一</Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <CheckBox ></CheckBox>
          </View>
      </View> ,
      height: 36,
  },
  {
      component: 
      <View style={{flexDirection: 'row', }}>
          <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期二</Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <CheckBox ></CheckBox>
          </View>
      </View> ,
      height: 36,
  },
  {
      component: 
      <View style={{flexDirection: 'row', }}>
          <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期三</Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <CheckBox ></CheckBox>
          </View>
      </View> ,
      height: 36,
  },
  {
      component: 
      <View style={{flexDirection: 'row', }}>
          <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期四</Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <CheckBox ></CheckBox>
          </View>
      </View> ,
      height: 36,
  },
  {
      component: 
      <View style={{flexDirection: 'row', }}>
          <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期五</Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <CheckBox ></CheckBox>
          </View>
      </View> ,
      height: 36,
  },
  {
      component: 
      <View style={{flexDirection: 'row', }}>
          <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期六</Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <CheckBox ></CheckBox>
          </View>
      </View> ,
      height: 36,
  },
  {
      component: 
      <View style={{flexDirection: 'row', }}>
          <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期天</Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <CheckBox ></CheckBox>
          </View>
      </View> ,
      height: 36,
  },
];


export default class InOutLog extends Component {
  constructor(props) {
    super(props);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._showTimeBetween = this._showTimeBetween.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this.data = [];
    // this.
  }
  state = {
    days: [false, false, false, false, false, false, false, false],
    userid: 1,
    list: [],
    token: '',
    isRefreshing: false,      
    waiting: false,
    dialogShow: false,
    nick_name: 'tom',
    isDateTimePickerVisible: false,
    isBeginTime: true,
    beginTime: '',
    endTime: '',
    isShowPeopleDate: false,
    // weekData : [
    //   '取消',
    //   {
    //       component: 
    //       <View style={{flexDirection: 'row', }}>
    //           <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>全选</Text>
    //           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //               <CheckBox value={this.state.days[0]}
    //               onValueChange={() => {
    //                 var temp = this.state.days;
    //                 temp[0] = !temp[0];
    //                 this.setState({days: temp});
    //                 console.log(this.state.days[0]);
    //                 // this.state.days[0] =  !this.state.days[0];
    //                 // console.log(this.state.days[0]);
                    
    //               }}/>
    //           </View>
    //       </View> ,
    //       height: 36,
    //   },
    //   {
    //       component: 
    //       <View style={{flexDirection: 'row', }}>
    //           <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期一</Text>
    //           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //           <CheckBox value={this.state.days[1]}></CheckBox>
    //           </View>
    //       </View> ,
    //       height: 36,
    //   },
    //   {
    //       component: 
    //       <View style={{flexDirection: 'row', }}>
    //           <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期二</Text>
    //           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //           <CheckBox value={this.state.days[2]}></CheckBox>
    //           </View>
    //       </View> ,
    //       height: 36,
    //   },
    //   {
    //       component: 
    //       <View style={{flexDirection: 'row', }}>
    //           <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期三</Text>
    //           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //           <CheckBox value={this.state.days[3]}></CheckBox>
    //           </View>
    //       </View> ,
    //       height: 36,
    //   },
    //   {
    //       component: 
    //       <View style={{flexDirection: 'row', }}>
    //           <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期四</Text>
    //           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //           <CheckBox value={this.state.days[4]}></CheckBox>
    //           </View>
    //       </View> ,
    //       height: 36,
    //   },
    //   {
    //       component: 
    //       <View style={{flexDirection: 'row', }}>
    //           <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期五</Text>
    //           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //           <CheckBox value={this.state.days[5]}></CheckBox>
    //           </View>
    //       </View> ,
    //       height: 36,
    //   },
    //   {
    //       component: 
    //       <View style={{flexDirection: 'row', }}>
    //           <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期六</Text>
    //           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //           <CheckBox value={this.state.days[6]}></CheckBox>
    //           </View>
    //       </View> ,
    //       height: 36,
    //   },
    //   {
    //       component: 
    //       <View style={{flexDirection: 'row', }}>
    //           <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期天</Text>
    //           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //           <CheckBox value={this.state.days[7]}></CheckBox>
    //           </View>
    //       </View> ,
    //       height: 36,
    //   },
    // ],
  }

  // ActionSheetCustom
  showActionSheet = () => this.actionSheet.show()

  getActionSheetRef = ref => (this.actionSheet = ref)

  // handlePress = index => {
  //   // this.setState({ selected: index });
  //   console.log(index);
  // }
  // ActionSheetCustom

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
    // if (this.state.waiting) {
    //     return <ActivityIndicator />;
    // } else {
        return <Text>~</Text>;
    // }
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
            let length = logList.length;
            if (length == 0) {
              this.setState({isRefreshing: false});
              this.setState({waiting: false}); 
              return;
            }
            // bug 在这里
            var lists = '[';
            console.log('lists');
            lists = lists + "{ \"" + "time" + "\":" + "\"" + logList[length - 1].visit_time + "\" , ";
            lists = lists + "\"" + "title" + "\":" + "\"" + logList[length - 1].nickname + "\" , "; 
            lists = lists + "\"" + "imageUrl" + "\":" + "\"" + BASE_URL + "/" + logList[length - 1].pic + "\","; 
            lists = lists + "\"" + "description" + "\":" + "\"" + logList[length - 1].result + "\"";
            if (logList[length - 1].result == '通过') {
              lists = lists + " , \"" + "circleColor" + "\":" + "\"" + "#00BFFF" + "\" , ";
              lists = lists + "\"" + "lineColor" + "\":" + "\"" + "#00BFFF" + "\"";             
            } else {
              lists = lists + " , \"" + "circleColor" + "\":" + "\"" + "#FF4500" + "\" , ";
              lists = lists + "\"" + "lineColor" + "\":" + "\"" + "#FF4500" + "\"";    
            }
            lists = lists +　" }"
            for (var i = length - 2 ; i >= 0; i--) {
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

  // 日期选择
  _renderHeader(section) {
    return (
      <View >
        {/* <CheckBox
          title={section.title}
          checked={this.state.isShowPeopleDate}
          // onPress={() => {
          //   this.setState({isShowPeopleDate: !this.state.isShowPeopleDate});
          // }}
        /> */}
        {/* <Button title={section.title}></Button> */}
        <Text style={styles.time_lable}>授权时间选择</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View>
        {this._showTimeBetween()}
      </View>
    );
  }
  ///


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
  showScaleAnimationDialog() {
    this.scaleAnimationDialog.show();
  }

  clickItem(event) {
    console.log('click item');
    console.log(event);

    this.setState({nick_name: event.title});

    this.showScaleAnimationDialog();
    
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", this.formatDate(date));
    if (this.state.isBeginTime) {
      console.log('is begin time');
      this.setState({beginTime: this.formatDate(date)});
    } else if (!this.state.isBeginTime) {
      console.log('is end time');
      this.setState({endTime: this.formatDate(date)});      
    }
    console.log('begin time' + this.state.beginTime + 'end time' + this.state.endTime);
    this._hideDateTimePicker();
  };

  formatDate(date) {
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
  }

  _showTimeBetween() {
    // if (this.state.isShowPeopleDate) {
      return(
        <View>
          <View style={styles.input_warpper}>
            <Text style={styles.input_lable}>授权开始时间</Text>
            <TouchableOpacity style={styles.tb_warpper} onPress={() => {
              this.setState({isBeginTime: true});                
              this.setState({isDateTimePickerVisible: true});
            }}>
              <Text style={styles.time_lable}>{this.state.beginTime}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.input_warpper}>
            <Text style={styles.input_lable}>授权截止时间</Text>
            <TouchableOpacity style={styles.tb_warpper}  onPress={() => {
              this.setState({isBeginTime: false});                                
              this.setState({isDateTimePickerVisible: true});
            }}>
              <Text style={styles.time_lable}>{this.state.endTime}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.input_warpper}>
            <Text style={styles.input_lable} onPress={() => {
              this.popupDialog.show(() => {
                console.log('callback - will be called immediately')
              });
            }}>星期选择</Text>
            
          </View>
          
        </View>
      )
    // } else {
      // return null;
    // }
  }

  _renderWeekSelect() {
    return(
      <View>
  <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
      <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>全选</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CheckBox value={this.state.days[0]}
        onValueChange={() => {
          var temp = this.state.days;
          temp[0] = !temp[0];
          this.setState({days: temp});
          console.log(this.state.days[0]);
        }}/>
      </View>
  </View>
  <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
      <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期一</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CheckBox value={this.state.days[1]}
        onValueChange={() => {
          var temp = this.state.days;
          temp[1] = !temp[1];
          this.setState({days: temp});
          console.log(this.state.days[1]);
        }}/>
      </View>
  </View>
  <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
      <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期二</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CheckBox value={this.state.days[2]}
        onValueChange={() => {
          var temp = this.state.days;
          temp[2] = !temp[2];
          this.setState({days: temp});
          console.log(this.state.days[2]);
        }}/>
      </View>
  </View>
  <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
      <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期三</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CheckBox value={this.state.days[3]}
        onValueChange={() => {
          var temp = this.state.days;
          temp[3] = !temp[3];
          this.setState({days: temp});
          console.log(this.state.days[3]);
        }}/>
      </View>
  </View>
  <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
      <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期四</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CheckBox value={this.state.days[4]}
        onValueChange={() => {
          var temp = this.state.days;
          temp[4] = !temp[4];
          this.setState({days: temp});
          console.log(this.state.days[4]);
        }}/>
      </View>
  </View>
  <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
      <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期五</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CheckBox value={this.state.days[5]}
        onValueChange={() => {
          var temp = this.state.days;
          temp[5] = !temp[5];
          this.setState({days: temp});
          console.log(this.state.days[5]);
        }}/>
      </View>
  </View>
  <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
       <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期六</Text>
       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <CheckBox value={this.state.days[6]}
         onValueChange={() => {
           var temp = this.state.days;
           temp[6] = !temp[6];
           this.setState({days: temp});
           console.log(this.state.days[6]);
         }}/>
       </View>
   </View>
   <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
       <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>星期天</Text>
       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <CheckBox value={this.state.days[7]}
         onValueChange={() => {
           var temp = this.state.days;
           temp[7] = !temp[7];
           this.setState({days: temp});
           console.log(this.state.days[7]);
         }}/>
       </View>
   </View>
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
          onEventPress={(event) => {this.clickItem(event)}}
          detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#BBDAFF", borderRadius: 10}}
        />
        <View >

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>

        <PopupDialog
          ref={(popupDialog) => {
            this.scaleAnimationDialog = popupDialog;
          }}
          height={0.6}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="修改人员信息" />}
          actions={[
            <View style={styles.dia_btn_warpper}
              key="view-1"> 
            <DialogButton
              text="绑定" 
              buttonStyle={styles.dia_btn}                              
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="button-1"
            />
            <DialogButton
              text="关闭" 
              buttonStyle={styles.dia_btn}             
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="button-2"
            />
            </View>
          ]}
        >
          <View style={styles.dialogContentView}>
            <View style={styles.input_warpper}>
              <Text style={styles.input_lable}>昵称</Text>
              <TextInput
                style={styles.input_style}
                onChangeText={(text) => this.setState({text})}
                value={this.state.nick_name}
              />
            </View>
            <Accordion
              sections={SECTIONS}
              renderHeader={this._renderHeader}
              renderContent={this._showTimeBetween}
              underlayColor='#fff'
              onChange={(index) => {
                index = false;
              }}

            />

            
          </View>
        </PopupDialog>


        
          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogAnimation={slideAnimation}
            height={0.5}
            actions={[
              <View style={styles.dia_btn_warpper}
                key="view-2"> 
              <DialogButton
                text="绑定" 
                buttonStyle={styles.dia_btn}                              
                onPress={() => {
                  this.scaleAnimationDialog.dismiss();
                }}
                key="button-3"
              />
              <DialogButton
                text="关闭" 
                buttonStyle={styles.dia_btn}             
                onPress={() => {
                  this.scaleAnimationDialog.dismiss();
                }}
                key="button-4"
              />
              </View>
            ]}
              >
            <View>
              {this._renderWeekSelect()}
            
            </View>
          </PopupDialog>

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
  input_warpper: {
    flexDirection: 'row',
    
  },
  input_lable: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    justifyContent: 'center',
    textAlign:'center',
  },
  input_style: {
    flex: 3,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingRight: 10,
    justifyContent: 'center',
    
  },
  tb_warpper: {
    flex: 1
  },
  time_lable: {
    // flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    justifyContent: 'center',
    textAlign:'center',
  },
  dia_btn_warpper: {
    flexDirection: 'row',
  },
  dia_btn:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  } ,             
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,    
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    // marginTop:20,
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