import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
	Dimensions,
	ListView,
  TouchableOpacity,
	Image,
	ScrollView,
	WebView
} from 'react-native';
import TitleBar from './TitleBar';
import { StackNavigator } from 'react-navigation';
import { SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {AUTH_PERMISSION_TIME_TO_BIND_USER, BASE_URL} from '../commons/Api';
import { Card, ListItem, Button } from 'react-native-elements'
import PopupDialog, 
{ SlideAnimation,
  ScaleAnimation,  
  DialogTitle,
  DialogButton, } from 'react-native-popup-dialog';
import Accordion from 'react-native-collapsible/Accordion';



const scaleAnimation = new ScaleAnimation();
const users = [
	{
		 name: 'brynn',
		 avatar: './img/head.jpg'
	}
 ]

 const SECTIONS = [
	{
	  title: 'First',
	  content: 'Lorem ipsum...'
	}
  ];

export default class RegisterPerson extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		// this.state = {
		// 	listViewData: Array(20).fill('').map((_,i) => ({key: `${i}`, text: `item #${i}`})),
		// };
  }
  
  state = {
		listType: 'FlatList',		
		token: '',
		listViewData: [],
		test : [
			{
				 name: 'brynn',
				 avatar: './img/head.jpg'
			},
			{
				name: 'brynn',
				avatar: './img/head.jpg'
		 }
		 ],
		 itemData: {}
  }

  componentDidMount() {
    this.initData();
  }

	closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

	deleteRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		const newData = [...this.state.listViewData];
		const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		this.setState({listViewData: newData});
	}

	onRowDidOpen = (rowKey, rowMap) => {
		console.log('This row opened', rowKey);
		setTimeout(() => {
			this.closeRow(rowMap, rowKey);
		}, 2000);
  }

  initData() {
		this.fetchRegisterInfo();
    // this.setState({isRefreshing: true});
    // storage.load({
    //   key: 'user',
      
    //   autoSync: true,
      
    //   syncInBackground: true,

    //   syncParams: {
    //     extraFetchOptions: {
    //       // 各种参数
    //     },
    //     someFlag: true,
    //   },
    // }).then(ret => {
    //   console.log('token success' + ret.token);      
    //   this.setState({token: ret.token});
    //   this.fetchRegisterInfo();
    // }).catch(err => {
    //   this.refs.toast.show('获取用户信息失败');      
    //   console.log('token err' + err.message);
    //   switch (err.name) {
    //       case 'NotFoundError':
    //           // TODO;
    //           break;
    //       case 'ExpiredError':
    //           // TODO
    //           break;
    //   }
    // })
  }
  
  fetchRegisterInfo() {
    (async () => {
      try {
		// var uuri = AUTH_PERMISSION_TIME_TO_BIND_USER + "1" + "/users";
		var uuri = "http://192.168.176.2:8081/housePeople.json";
		console.log(uuri);
		const resC = await fetch(uuri, {
			method: 'GET',
			headers: {
			'Authorization': this.state.token
			},
		});
          
		const data = await resC.json();
		var list = data.data;
		console.log(data);
		console.log(list);		
		this.setState({listViewData: list});
      } catch (err) {
          console.log(err);
          this.refs.toast.show('获取信息失败');
      }
    })();
  }

  showScaleAnimationDialog() {
    this.scaleAnimationDialog.show();
  }

  // 点击 item 获取数据
  showMsg(i) {
	console.log(this.state.listViewData[i]);
	this.setState({itemData: this.state.listViewData[i]});
	this.showScaleAnimationDialog();
  }

	render() {

		return (
			<View style={styles.container}>
			<TitleBar title="注册成员" navigation={this.props.navigation}></TitleBar>
				<ScrollView>
					<View>
						{
							this.state.listViewData.map((u, i) => {
								return(
									<TouchableOpacity key={i} 
									onPress={() => {
										console.log("111");
										console.log(i);
										this.showMsg(i);
									}}>
										
									
								<Card  title={u.nickname} >
									<View style={styles.user}>
										<View style={{justifyContent: 'center', flexDirection: 'row'}}>
										<Image
											style={{height: 140, width: 160}}
											resizeMode="cover"
											source={{uri: BASE_URL + "/" + u.pic}}
											/>
										</View>
										<View style={styles.userInfoWarpper}>
										<Text style={styles.name}>角色： {u.role.alias}</Text>
										<Text style={styles.name}>授权时间： {u.time.date[0]}  至  {u.time.date[1]}</Text>
										
										<Text style={styles.name}>授权星期：
										{u.time.week[0]=='1'?' 周一':''}
										{u.time.week[1]=='1'?' 周一':''}
										{u.time.week[2]=='1'?' 周一':''}
										{u.time.week[3]=='1'?' 周一':''}
										{u.time.week[4]=='1'?' 周一':''}
										{u.time.week[5]=='1'?' 周一':''}
										{u.time.week[6]=='1'?' 周一':''}
										{u.time.week[7]=='1'?' 周一':''}

										{u.time.week[0]=='2'?' 周二':''}
										{u.time.week[1]=='2'?' 周二':''}
										{u.time.week[2]=='2'?' 周二':''}
										{u.time.week[3]=='2'?' 周二':''}
										{u.time.week[4]=='2'?' 周二':''}
										{u.time.week[5]=='2'?' 周二':''}
										{u.time.week[6]=='2'?' 周二':''}
										{u.time.week[7]=='2'?' 周二':''}

										{u.time.week[0]=='3'?' 周三':''}
										{u.time.week[1]=='3'?' 周三':''}
										{u.time.week[2]=='3'?' 周三':''}
										{u.time.week[3]=='3'?' 周三':''}
										{u.time.week[4]=='3'?' 周三':''}
										{u.time.week[5]=='3'?' 周三':''}
										{u.time.week[6]=='3'?' 周三':''}
										{u.time.week[7]=='3'?' 周三':''}

										{u.time.week[0]=='4'?' 周四':''}
										{u.time.week[1]=='4'?' 周四':''}
										{u.time.week[2]=='4'?' 周四':''}
										{u.time.week[3]=='4'?' 周四':''}
										{u.time.week[4]=='4'?' 周四':''}
										{u.time.week[5]=='4'?' 周四':''}
										{u.time.week[6]=='4'?' 周四':''}
										{u.time.week[7]=='4'?' 周四':''}		
										
										{u.time.week[0]=='5'?' 周五':''}
										{u.time.week[1]=='5'?' 周五':''}
										{u.time.week[2]=='5'?' 周五':''}
										{u.time.week[3]=='5'?' 周五':''}
										{u.time.week[4]=='5'?' 周五':''}
										{u.time.week[5]=='5'?' 周五':''}
										{u.time.week[6]=='5'?' 周五':''}
										{u.time.week[7]=='5'?' 周五':''}
										
										{u.time.week[0]=='6'?' 周六':''}
										{u.time.week[1]=='6'?' 周六':''}
										{u.time.week[2]=='6'?' 周六':''}
										{u.time.week[3]=='6'?' 周六':''}
										{u.time.week[4]=='6'?' 周六':''}
										{u.time.week[5]=='6'?' 周六':''}
										{u.time.week[6]=='6'?' 周六':''}
										{u.time.week[7]=='6'?' 周六':''}	
																				
										{u.time.week[0]=='7'?' 周日':''}
										{u.time.week[1]=='7'?' 周日':''}
										{u.time.week[2]=='7'?' 周日':''}
										{u.time.week[3]=='7'?' 周日':''}
										{u.time.week[4]=='7'?' 周日':''}
										{u.time.week[5]=='7'?' 周日':''}
										{u.time.week[6]=='7'?' 周日':''}
										{u.time.week[7]=='7'?' 周日':''}
										</Text>											
										</View>
										
									</View>
							</Card>
							</TouchableOpacity>
								)
							})
						}
					</View>
					<PopupDialog
						ref={(popupDialog) => {
							this.scaleAnimationDialog = popupDialog;
						}}
						height={0.5}						
						dialogAnimation={scaleAnimation}
						dialogTitle={<DialogTitle title="修改已登记人员信息" />}
						actions={[
							<View style={styles.dia_btn_warpper}
							key="view-1"> 
							<DialogButton
							text="确认" 
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
						<View style={{flex: 1}}>
							<View style={styles.person_warpper}>
								<Image 
								style={styles.person_img}
								source={require('./img/png.png')}/>
							</View>
							<Accordion
							sections={SECTIONS}
							renderHeader={this._renderHeader}
							renderContent={this._renderConfirmTime}
							underlayColor='#fff'
							onChange={(index) => {
								index = false;
							}}

							/>
							
							{/* <WebView
								source={{uri: 'http://118.24.0.78:8082/index.html'}}
								style={{marginTop: 20}}
							/> */}
							
						</View>
						</PopupDialog>
				</ScrollView>
			</View>
		);
	}

	_renderHeader() {
		return(
			<View style={styles.input_warpper}>
				<Text style={styles.input_lable}>授权时间</Text>
			</View>
		)
	}
	_renderConfirmTime() {
		return(
			<View style={styles.input_warpper}>
				<Text style={styles.input_lable}>授权星期</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
  },
  itemWarpper: {
		flexDirection: 'row',    
  },
  infoWarpper: {
    marginLeft: 20
  },
  userInfoWarpper: {
	  marginLeft: 20,
	  marginTop: 10
  },
  dia_btn_warpper: {
    flexDirection: 'row',
  },
  dia_btn:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
    
  } ,  
  person_warpper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  person_img: {
    // flex: 1,    
    width: 120,
    height: 100,
    
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
});
