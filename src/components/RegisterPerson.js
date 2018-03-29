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
	ScrollView
} from 'react-native';
import TitleBar from './TitleBar';
import { StackNavigator } from 'react-navigation';
import { SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {AUTH_PERMISSION_TIME_TO_BIND_USER} from '../commons/Api';
import { Card, ListItem, Button } from 'react-native-elements'

const users = [
	{
		 name: 'brynn',
		 avatar: './img/head.jpg'
	}
 ]



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
		 ]
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
					var uuri = "http://192.168.220.2:8081/housePeople.json";
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
					this.setState({listViewData: list});
      } catch (err) {
          console.log(err);
          this.refs.toast.show('获取信息失败');
      }
    })();
  }

	render() {
		return (
			<View style={styles.container}>
					{/* <SwipeListView
						useFlatList
						data={this.state.listViewData}
						renderItem={ (data, rowMap) => (
							<TouchableHighlight
								onPress={ _ => console.log('You touched me') }
								style={styles.rowFront}
								underlayColor={'#AAA'}
							>
								<View style={styles.itemWarpper}>
                  <Image 
                  style={{height: 50, width: 50}} 
                  source={require('./img/head.jpg')}/>
                  <View style={styles.infoWarpper}> 
                    <Text>I am {data.nickname}</Text>
                    <Text>{data.created_at}</Text>
                  </View>
								</View>
							</TouchableHighlight>
						)}
						renderHiddenItem={ (data, rowMap) => (
							<View style={styles.rowBack}>
								<Text>Left</Text>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} 
                onPress={ _ => this.closeRow(rowMap, data.item.key) }>
									<Text style={styles.backTextWhite}>关闭</Text>
								</TouchableOpacity>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} 
                onPress={ _ => this.deleteRow(rowMap, data.item.key) }>
									<Text style={styles.backTextWhite}>删除</Text>
								</TouchableOpacity>
							</View>
						)}
						leftOpenValue={75}
						rightOpenValue={-150}
						onRowDidOpen={this.onRowDidOpen}
					/> */}
					<ScrollView>
						<View>
							{
								this.state.test.map((u, i) => {
									return(
									<Card key={i} title="你的名字">
										<View style={styles.user}>
											<View style={{justifyContent: 'center', flexDirection: 'row'}}>
											<Image
													style={{height: 140, width: 160}}
													resizeMode="cover"
													source={{ uri: u.avatar }}
												/>
											</View>
											<Text style={styles.name}>{u.name}</Text>
										</View>
								</Card>
									)
								})
							}
						</View>

					</ScrollView>
			</View>
		);
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
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		justifyContent: 'center',
		height: 60,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 60,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: Dimensions.get('window').width / 4,
	}
});
