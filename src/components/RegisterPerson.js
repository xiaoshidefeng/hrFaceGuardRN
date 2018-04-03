import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    object,
    Image,
    TouchableOpacity,
    CheckBox,
    ListView,
    ScrollView,
} from 'react-native';
import TitleBar from './TitleBar';
import {AUTH_PERMISSION_TIME_TO_BIND_USER, BASE_URL, UPDATE_PERMISSION_TIME} from '../commons/Api';
import {Card, ListItem, Button} from 'react-native-elements'
import PopupDialog,
{
    SlideAnimation,
    ScaleAnimation,
    DialogTitle,
    DialogButton,
} from 'react-native-popup-dialog';
import Accordion from 'react-native-collapsible/Accordion';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Calendar from 'react-native-calendar-select';

const slideAnimation = new SlideAnimation({slideFrom: 'bottom'});
const scaleAnimation = new ScaleAnimation();


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
        this.confirmDate = this.confirmDate.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
    }

    state = {
        token: '',
        listType: 'FlatList',
        token: '',
        listViewData: [],
        test: [],
        itemData: {},
        beginTime: '2018-04-03',
        endTime: '2018-04-05',
        isDateTimePickerVisible: false,
        days: [true, true, true, true, true, true, true, true],
        startDate: new Date(2018, 3, 29),
        endDate: new Date(2018, 3, 31),
        visibleLoad: false
    }

    // 日期区间选择
    confirmDate({startDate, endDate, startMoment, endMoment}) {
        this.setState({beginTime: this.formatDate(startDate)});
        this.setState({endTime: this.formatDate(endDate)});


    }

    openCalendar() {
        this.calendar && this.calendar.open();
    }

    // 日期选择器控制
    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = date => {
        if (this.state.isBeginTime) {
            this.setState({beginTime: this.formatDate(date)});
        } else if (!this.state.isBeginTime) {
            this.setState({endTime: this.formatDate(date)});
        }
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


    componentDidMount() {
        this.setState({
            visible: !this.state.visible
        });
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
                var uuri;
                // if (flag == 'begin') {
                // uuri = "http://localhost:8081/housePeople.json";

                // } else {
                    uuri = AUTH_PERMISSION_TIME_TO_BIND_USER + "1" + "/users";
                // }
                const resC = await fetch(uuri, {
                    method: 'GET',
                    headers: {
                        'Authorization': this.state.token
                    },
                });

                const data = await resC.json();
                var list = data.data;
                console.log(list);
                this.setState({
                    visible: false
                });
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
        this.setState({itemData: this.state.listViewData[i]});
        this.setState({beginTime: this.state.listViewData[i].time.date[0]});
        this.setState({endTime: this.state.listViewData[i].time.date[1]});
        this.setState({user_id: this.state.listViewData[i].user_id});
        this.setState({role_id: this.state.listViewData[i].role.id});
        var te = this.state.listViewData[i].time.week;
        var temp = this.state.days;

        for (var i = 0; i <= 7; i++) {
            temp[i] = false;
        }

        for (var i = 0; i < te.length; i++) {
            var j = te[i];
            temp[j] = true;
        }
        this.setState({days: temp});

        this.showScaleAnimationDialog();
    }

    render() {
        let customI18n = {
            'w': ['', '一', '二', '三', '四', '五', '六', '日'],
            'weekday': ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            'text': {
                'start': '开 始',
                'end': '结 束',
                'date': '日 期',
                'save': '确 定',
                'clear': '重 置'
            },
            'date': 'DD / MM'  // date format
        };
        // optional property, too.
        let color = {
            subColor: '#f0f0f0'
        };
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
											// source={require('./img/head.jpg')}
											/>
										</View>
										<View style={styles.userInfoWarpper}>
										<Text style={styles.name}>角色： {u.role.alias}</Text>
										<Text style={styles.name}>授权时间： {u.time.date[0]}  至  {u.time.date[1]}</Text>

                                                    <Text style={styles.name}>授权星期：
                                                        {u.time.week[0] == '1' ? ' 周一' : ''}
                                                        {u.time.week[1] == '1' ? ' 周一' : ''}
                                                        {u.time.week[2] == '1' ? ' 周一' : ''}
                                                        {u.time.week[3] == '1' ? ' 周一' : ''}
                                                        {u.time.week[4] == '1' ? ' 周一' : ''}
                                                        {u.time.week[5] == '1' ? ' 周一' : ''}
                                                        {u.time.week[6] == '1' ? ' 周一' : ''}
                                                        {u.time.week[7] == '1' ? ' 周一' : ''}

                                                        {u.time.week[0] == '2' ? ' 周二' : ''}
                                                        {u.time.week[1] == '2' ? ' 周二' : ''}
                                                        {u.time.week[2] == '2' ? ' 周二' : ''}
                                                        {u.time.week[3] == '2' ? ' 周二' : ''}
                                                        {u.time.week[4] == '2' ? ' 周二' : ''}
                                                        {u.time.week[5] == '2' ? ' 周二' : ''}
                                                        {u.time.week[6] == '2' ? ' 周二' : ''}
                                                        {u.time.week[7] == '2' ? ' 周二' : ''}

                                                        {u.time.week[0] == '3' ? ' 周三' : ''}
                                                        {u.time.week[1] == '3' ? ' 周三' : ''}
                                                        {u.time.week[2] == '3' ? ' 周三' : ''}
                                                        {u.time.week[3] == '3' ? ' 周三' : ''}
                                                        {u.time.week[4] == '3' ? ' 周三' : ''}
                                                        {u.time.week[5] == '3' ? ' 周三' : ''}
                                                        {u.time.week[6] == '3' ? ' 周三' : ''}
                                                        {u.time.week[7] == '3' ? ' 周三' : ''}

                                                        {u.time.week[0] == '4' ? ' 周四' : ''}
                                                        {u.time.week[1] == '4' ? ' 周四' : ''}
                                                        {u.time.week[2] == '4' ? ' 周四' : ''}
                                                        {u.time.week[3] == '4' ? ' 周四' : ''}
                                                        {u.time.week[4] == '4' ? ' 周四' : ''}
                                                        {u.time.week[5] == '4' ? ' 周四' : ''}
                                                        {u.time.week[6] == '4' ? ' 周四' : ''}
                                                        {u.time.week[7] == '4' ? ' 周四' : ''}

                                                        {u.time.week[0] == '5' ? ' 周五' : ''}
                                                        {u.time.week[1] == '5' ? ' 周五' : ''}
                                                        {u.time.week[2] == '5' ? ' 周五' : ''}
                                                        {u.time.week[3] == '5' ? ' 周五' : ''}
                                                        {u.time.week[4] == '5' ? ' 周五' : ''}
                                                        {u.time.week[5] == '5' ? ' 周五' : ''}
                                                        {u.time.week[6] == '5' ? ' 周五' : ''}
                                                        {u.time.week[7] == '5' ? ' 周五' : ''}

                                                        {u.time.week[0] == '6' ? ' 周六' : ''}
                                                        {u.time.week[1] == '6' ? ' 周六' : ''}
                                                        {u.time.week[2] == '6' ? ' 周六' : ''}
                                                        {u.time.week[3] == '6' ? ' 周六' : ''}
                                                        {u.time.week[4] == '6' ? ' 周六' : ''}
                                                        {u.time.week[5] == '6' ? ' 周六' : ''}
                                                        {u.time.week[6] == '6' ? ' 周六' : ''}
                                                        {u.time.week[7] == '6' ? ' 周六' : ''}

                                                        {u.time.week[0] == '7' ? ' 周日' : ''}
                                                        {u.time.week[1] == '7' ? ' 周日' : ''}
                                                        {u.time.week[2] == '7' ? ' 周日' : ''}
                                                        {u.time.week[3] == '7' ? ' 周日' : ''}
                                                        {u.time.week[4] == '7' ? ' 周日' : ''}
                                                        {u.time.week[5] == '7' ? ' 周日' : ''}
                                                        {u.time.week[6] == '7' ? ' 周日' : ''}
                                                        {u.time.week[7] == '7' ? ' 周日' : ''}
                                                    </Text>
                                                </View>

                                            </View>
                                        </Card>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View>
                        <Calendar
                            i18n="zh"
                            ref={(calendar) => {
                                this.calendar = calendar;
                            }}
                            customI18n={customI18n}
                            color={color}
                            format="YYYYMMDD"
                            minDate="20180101"
                            maxDate="20190101"
                            startDate={this.state.beginTime}
                            endDate={this.state.endTime}
                            onConfirm={this.confirmDate}
                        />
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
                    </View>
                    <PopupDialog
                        ref={(popupDialog) => {
                            this.scaleAnimationDialog = popupDialog;
                        }}
                        height={0.5}
                        dialogAnimation={scaleAnimation}
                        dialogTitle={<DialogTitle title={this.state.itemData.nickname}/>}
                        actions={[
                            <View style={styles.dia_btn_warpper}
                                  key="view-1">
                                <DialogButton
                                    text="确认"
                                    buttonStyle={styles.dia_btn}
                                    onPress={() => {
                                        this.updateUserInfo();
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
                            {/* <View style={styles.person_warpper}>
								<Image 
								style={styles.person_img}
								source={{uri: BASE_URL + '/' + this.state.itemData.pic}}/>
							</View> */}
                            {/* <Accordion
                                sections={SECTIONS}
                                renderHeader={this._renderHeader.bind(this)}
                                renderContent={this._showTimeBetween.bind(this)}
                                underlayColor='#fff'
                                onChange={(index) => {
                                    index = false;
                                }}

                            /> */}
                            {this._renderHeader()}
                            {this._showTimeBetween()}
                            {/*
							<WebView
								source={{uri: 'https://github.com/'}}
								style={{marginTop: 20}}
							/> */}

                        </View>
                    </PopupDialog>


                    <PopupDialog
                        ref={(popupDialog) => {
                            this.popupDialog = popupDialog;
                        }}
                        dialogAnimation={slideAnimation}
                        height={0.55}
                        actions={[
                            <View style={styles.dia_btn_warpper}
                                  key="view-2">
                                <DialogButton
                                    text="确定"
                                    buttonStyle={styles.dia_btn}
                                    onPress={() => {
                                        this.popupDialog.dismiss();
                                    }}
                                    key="button-3"
                                />
                                <DialogButton
                                    text="取消"
                                    buttonStyle={styles.dia_btn}
                                    onPress={() => {
                                        this.popupDialog.dismiss();
                                        var temp = this.state.days;
                                        for (var i = 0; i <= 7; i++) {
                                            temp[i] = false;
                                        }
                                        this.setState({days: temp});
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
                </ScrollView>
            </View>
        );
    }

    _renderHeader() {
        return (
            <View style={styles.input_warpper}>
                <Text style={styles.input_lable}>授权时间</Text>

            </View>
        )
    }

    _renderConfirmTime() {
        return (
            <View style={styles.input_warpper}>
                <Text>{this.state.beginTime}</Text>

                {/* <Text>{this.state.itemData.time.date[0]}</Text> */}


                <Text style={styles.input_lable}>授权星期</Text>

            </View>
        )
    }

    // 更新用户信息
    updateUserInfo() {
        this.setState({
            visible: true
        });
        this.toFetchUpdateTime();
        this.scaleAnimationDialog.dismiss();

    }


    formatWeek() {
        var week = '{"date": ["';
        week = week + this.state.beginTime + "\", \"" + this.state.endTime + '"], "week": [';
        var temp = this.state.days;
        if (temp[0]) {
            week = week + "1,2,3,4,5,6,7]}"
        } else {
            for (var i = 1; i <= 7; i++) {
                if (temp[i]) {
                    week = week + i;
                    ++i;
                    for (; i <= 7; i++) {
                        if (temp[i]) {
                            week = week + "," + i;
                        }
                    }
                    break;
                }
            }
            week += "]}";
        }
        return week;
    }

    toFetchUpdateTime() {
        var weekFormat = this.formatWeek();

        let formData = new FormData();
        formData.append("user_id", this.state.user_id);
        formData.append("role_id", this.state.role_id);
        formData.append("time", JSON.stringify(JSON.parse(weekFormat)));
        formData.append("_method", "PATCH");


        (async () => {
            try {
                var uuri = UPDATE_PERMISSION_TIME + this.state.user_id + "/addresses/1";
                const resC = await fetch(uuri, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': this.state.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "user_id": this.state.user_id,
                        "role_id": this.state.role_id,
                        "time": JSON.stringify(JSON.parse(weekFormat))
                    })
                });

                const data = await resC.json();

                this.scaleAnimationDialog.dismiss();
                this.fetchRegisterInfo();
                return true;

            } catch (err) {
                console.log(err)
                this.refs.toast.show('绑定失败');
            }
        })();
    }

    _showTimeBetween() {
        return (
            <View>
                <View style={styles.input_warpper}>
                    <TouchableOpacity style={styles.tb_warpper} onPress={() => {
                        this.openCalendar();
                        // this.setState({isBeginTime: true});
                        // this.setState({isDateTimePickerVisible: true});
                    }}>
                        <Text style={styles.time_lable}>{this.state.beginTime}</Text>
                    </TouchableOpacity>
                    <Text style={styles.time_lable}>至</Text>

                    <TouchableOpacity style={styles.tb_warpper} onPress={() => {
                        this.openCalendar();
                        // this.setState({isBeginTime: false});
                        // this.setState({isDateTimePickerVisible: true});
                    }}>
                        <Text style={styles.time_lable}>{this.state.endTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.input_warpper}>

                </View>
                <View style={styles.input_warpper}>
                    <Text style={styles.input_lable} onPress={() => {
                        this.popupDialog.show();
                    }}>星期选择</Text>

                </View>

            </View>
        )
    }


    _renderWeekSelect() {
        return (
            <View>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                    <Text style={{flex: 1, fontSize: 16, textAlign: 'center', paddingTop: 5}}>全选</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CheckBox value={this.state.days[0]}
                                  onValueChange={() => {
                                      var temp = this.state.days;
                                      temp[0] = !temp[0];
                                      if (temp[0] == true) {
                                          for (var i = 1; i <= 7; i++) {
                                              temp[i] = true;
                                          }
                                      }
                                      this.setState({days: temp});
                                  }}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                    <Text style={{flex: 1, fontSize: 16, textAlign: 'center', paddingTop: 5}}>星期一</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CheckBox value={this.state.days[1]}
                                  onValueChange={() => {
                                      var temp = this.state.days;
                                      temp[1] = !temp[1];
                                      if (temp[1] == false) {
                                          temp[0] = false;
                                      }
                                      this.setState({days: temp});
                                  }}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                    <Text style={{flex: 1, fontSize: 16, textAlign: 'center', paddingTop: 5}}>星期二</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CheckBox value={this.state.days[2]}
                                  onValueChange={() => {
                                      var temp = this.state.days;
                                      temp[2] = !temp[2];
                                      if (temp[2] == false) {
                                          temp[0] = false;
                                      }
                                      this.setState({days: temp});
                                  }}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                    <Text style={{flex: 1, fontSize: 16, textAlign: 'center', paddingTop: 5}}>星期三</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CheckBox value={this.state.days[3]}
                                  onValueChange={() => {
                                      var temp = this.state.days;
                                      temp[3] = !temp[3];
                                      if (temp[3] == false) {
                                          temp[0] = false;
                                      }
                                      this.setState({days: temp});
                                  }}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                    <Text style={{flex: 1, fontSize: 16, textAlign: 'center', paddingTop: 5}}>星期四</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CheckBox value={this.state.days[4]}
                                  onValueChange={() => {
                                      var temp = this.state.days;
                                      temp[4] = !temp[4];
                                      if (temp[4] == false) {
                                          temp[0] = false;
                                      }
                                      this.setState({days: temp});
                                  }}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                    <Text style={{flex: 1, fontSize: 16, textAlign: 'center', paddingTop: 5}}>星期五</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CheckBox value={this.state.days[5]}
                                  onValueChange={() => {
                                      var temp = this.state.days;
                                      temp[5] = !temp[5];
                                      if (temp[5] == false) {
                                          temp[0] = false;
                                      }
                                      this.setState({days: temp});
                                  }}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                    <Text style={{flex: 1, fontSize: 16, textAlign: 'center', paddingTop: 5}}>星期六</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CheckBox value={this.state.days[6]}
                                  onValueChange={() => {
                                      var temp = this.state.days;
                                      temp[6] = !temp[6];
                                      if (temp[6] == false) {
                                          temp[0] = false;
                                      }
                                      this.setState({days: temp});
                                  }}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                    <Text style={{flex: 1, fontSize: 16, textAlign: 'center', paddingTop: 5}}>星期天</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <CheckBox value={this.state.days[7]}
                                  onValueChange={() => {
                                      var temp = this.state.days;
                                      temp[7] = !temp[7];
                                      if (temp[7] == false) {
                                          temp[0] = false;
                                      }
                                      this.setState({days: temp});
                                  }}/>
                    </View>
                </View>
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
    dia_btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'

    },
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
        textAlign: 'center',
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
        textAlign: 'center',
    },
});
