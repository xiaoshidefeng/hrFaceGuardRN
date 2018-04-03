import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    object,
    Image,
    RefreshControl,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {
    GET_IN_OUT_LOG_BY_ADDRESS, BASE_URL,
    GET_USER_PERMISSION_TIME_BY_ADDRESS,
    UPDATE_PERMISSION_TIME
} from '../commons/Api';
import Toast, {DURATION} from 'react-native-easy-toast'
import Storage from 'react-native-storage';
import Timeline from 'react-native-timeline-listview';
import TitleBar from './TitleBar';
import PopupDialog,
{
    SlideAnimation,
    ScaleAnimation,
    DialogTitle,
    DialogButton,
} from 'react-native-popup-dialog';
import {SelectMultipleButton, SelectMultipleGroupButton} from 'react-native-selectmultiple-button'

const slideAnimation = new SlideAnimation({slideFrom: 'bottom'});
const scaleAnimation = new ScaleAnimation();


const ios_blue = '#007AFF'
const radioData = ['家人', '亲戚', '保姆', '暂行']

export default class InOutLog extends Component {
    constructor(props) {
        super(props);
        this.onEndReached = this.onEndReached.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this._renderContent = this._renderContent.bind(this);
        this.data = [];
    }

    state = {
        days: [true, true, true, true, true, true, true, true],
        user_id: '',
        list: [],
        token: '',
        isRefreshing: false,
        waiting: false,
        dialogShow: false,
        nick_name: 'tom',
        role_id: '',
        role_alias: '',
        address_id: '',
        isDateTimePickerVisible: false,
        isBeginTime: true,
        beginTime: '点击选择开始时间',
        endTime: '点击选择结束时间',
        isShowPeopleDate: false,
        imageUrl: 'www',
        radioSelectedData: '亲戚'
    }

    // ActionSheetCustom
    showActionSheet = () => this.actionSheet.show()

    getActionSheetRef = ref => (this.actionSheet = ref)


    componentWillMount() {

    }

    componentDidMount() {
        this.loadUserInfo();
    }


    onRefresh() {
        this.setState({isRefreshing: true});
        this.fetchInOutList();
    }

    onEndReached() {
        if (!this.state.waiting) {
            this.setState({waiting: true});
            this.fetchInOutList();

        }
    }

    renderFooter() {
        return <Text>~</Text>;
    }

    fetchInOutList = () => {
        (async () => {
            try {
                // TODO 更新
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
                // 转换json
                var lists = '[';

                lists = lists + "{ \"" + "time" + "\":" + "\"" + logList[length - 1].visit_time + "\" , ";
                lists = lists + "\"" + "title" + "\":" + "\"" + logList[length - 1].nickname + "\" , ";
                lists = lists + "\"" + "imageUrl" + "\":" + "\"" + BASE_URL + "/" + logList[length - 1].pic + "\",";
                lists = lists + "\"" + "description" + "\":" + "\"" + logList[length - 1].result + "\",";
                lists = lists + "\"" + "description" + "\":" + "\"" + logList[length - 1].result + "\",";
                lists = lists + "\"" + "role_id" + "\":" + "\"" + logList[length - 1].role.id + "\",";
                lists = lists + "\"" + "address_id" + "\":" + "\"" + logList[length - 1].address.id + "\",";
                lists = lists + "\"" + "user_id" + "\":" + "\"" + logList[length - 1].user_id + "\",";
                lists = lists + "\"" + "role_alias" + "\":" + "\"" + logList[length - 1].role.alias + "\"";
                if (logList[length - 1].result == '通过') {
                    lists = lists + " , \"" + "circleColor" + "\":" + "\"" + "#00BFFF" + "\" , ";
                    lists = lists + "\"" + "lineColor" + "\":" + "\"" + "#00BFFF" + "\"";
                } else {
                    lists = lists + " , \"" + "circleColor" + "\":" + "\"" + "#FF4500" + "\" , ";
                    lists = lists + "\"" + "lineColor" + "\":" + "\"" + "#FF4500" + "\"";
                }
                lists = lists + " }"
                for (var i = length - 2; i >= 0; i--) {
                    lists = lists + ",{ \"" + "time" + "\":" + "\"" + logList[i].visit_time + "\" , ";
                    lists = lists + "\"" + "title" + "\":" + "\"" + logList[i].nickname + "\" , ";
                    lists = lists + "\"" + "imageUrl" + "\":" + "\"" + BASE_URL + "/" + logList[i].pic + "\" , ";
                    lists = lists + "\"" + "description" + "\":" + "\"" + logList[i].result + "\",";
                    lists = lists + "\"" + "user_id" + "\":" + "\"" + logList[i].user_id + "\",";
                    lists = lists + "\"" + "role_id" + "\":" + "\"" + logList[i].role.id + "\",";
                    lists = lists + "\"" + "address_id" + "\":" + "\"" + logList[i].address.id + "\",";
                    lists = lists + "\"" + "role_alias" + "\":" + "\"" + logList[i].role.alias + "\"";
                    if (logList[i].result == '通过') {
                        lists = lists + ",\"" + "circleColor" + "\":" + "\"" + "#00BFFF" + "\" , ";
                        lists = lists + "\"" + "lineColor" + "\":" + "\"" + "#00BFFF" + "\"  ";
                    } else {
                        lists = lists + ",\"" + "circleColor" + "\":" + "\"" + "#FF4500" + "\" , ";
                        lists = lists + "\"" + "lineColor" + "\":" + "\"" + "#FF4500" + "\"";
                    }
                    lists = lists + " }"
                }


                lists = lists + "]";
                var jlist = JSON.parse(lists);

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

            autoSync: true,

            syncInBackground: true,

            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            this.setState({token: ret.token});
            this.fetchInOutList();
        }).catch(err => {
            this.refs.toast.show('获取用户信息失败');
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


    _renderContent(section) {
        return (
            <View>
                {this._showTimeBetween()}
            </View>
        );
    }


    renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null
        if (rowData.description && rowData.imageUrl)
            desc = (
                <View style={styles.descriptionContainer}>
                    <Image source={{uri: rowData.imageUrl}} style={styles.image}/>
                    <Text style={[styles.textDescription]}>{rowData.description}</Text>
                </View>
            )

        return (
            <View style={{flex: 1}}>
                {title}
                {desc}
            </View>
        )
    }

    showScaleAnimationDialog() {
        this.scaleAnimationDialog.show();
    }

    clickItem(event) {

        this.setState({nick_name: event.title});
        this.setState({role_id: event.role_id});
        this.setState({address_id: event.address_id});
        this.setState({imageUrl: event.imageUrl});
        this.setState({role_alias: event.role_alias});
        this.setState({user_id: event.user_id});

        this.showScaleAnimationDialog();

    }


    // 获取当前点击用户的配置信息
    getUserTimeInfo(us_id, ad_id) {
        (async () => {
            try {
                var uuri = GET_USER_PERMISSION_TIME_BY_ADDRESS + us_id + "/addresses/" + ad_id;
                const resC = await fetch(uuri, {
                    method: 'GET',
                    headers: {
                        'Authorization': this.state.token
                    },
                });

                const data = await resC.json();
                var timeInfo = JSON.parse(data.data.time);

                this.setState({beginTime: timeInfo.date[0]});
                this.setState({endTime: timeInfo.date[1]});
                var te = timeInfo.week;

                var temp = this.state.days;

                for (var i = 0; i <= 7; i++) {
                    temp[i] = false;
                }

                for (var i = 0; i < te.length; i++) {

                    var j = te[i];
                    temp[j] = true;
                }
                this.setState({days: temp});

                return true;

            } catch (err) {
                console.log(err)
                this.refs.toast.show('获取信息失败');
            }
        })();
    }


    // 获取 role id
    getRoleId() {
        var role = this.state.radioSelectedData;
        if (role == '家人') {
            return 6;
        } else if (role == '亲戚') {
            return 7;
        } else if (role == '保姆') {
            return 8;
        } else if (role == '暂行') {
            return 9;
        }
    }

    // 更新权限

    toFetchUpdateTime() {
        var times = '{"date":["2018-03-28","2018-03-30"],"week":[1,2,3,4,5,6,7]}';
        let formData = new FormData();
        formData.append("role_id", this.getRoleId());
        formData.append("time", JSON.stringify(JSON.parse(times)));

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
                        "role_id": this.getRoleId(),
                        "time": JSON.stringify(JSON.parse(times))
                    })
                });

                const data = await resC.json();

                this.scaleAnimationDialog.dismiss();

                return true;

            } catch (err) {
                console.log(err)
                this.refs.toast.show('绑定失败');
            }
        })();
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
                        timeContainerStyle={{minWidth: 52, marginTop: 0}}
                        timeStyle={{
                            textAlign: 'center',
                            backgroundColor: '#ff9797',
                            color: 'white',
                            padding: 5,
                            borderRadius: 13
                        }}
                        descriptionStyle={{color: 'gray'}}
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
                        onEventPress={(event) => {
                            this.clickItem(event)
                        }}
                        detailContainerStyle={{
                            marginBottom: 20,
                            paddingLeft: 5,
                            paddingRight: 5,
                            backgroundColor: "#BBDAFF",
                            borderRadius: 10
                        }}
                    />
                    <View>

                    </View>

                    <PopupDialog
                        ref={(popupDialog) => {
                            this.scaleAnimationDialog = popupDialog;
                        }}
                        height={0.5}
                        dialogAnimation={scaleAnimation}
                        dialogTitle={<DialogTitle title="修改人员权限"/>}
                        actions={[
                            <View style={styles.dia_btn_warpper}
                                  key="view-1">
                                <DialogButton
                                    text="绑定"
                                    buttonStyle={styles.dia_btn}
                                    onPress={() => {
                                        this.toFetchUpdateTime();
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
                                    source={{uri: this.state.imageUrl}}/>
                            </View>

                            {this._tabView()}


                        </View>
                    </PopupDialog>

                    <Toast ref="toast"/>
                </View>
            </View>

        );
    }

    _tabView() {
        return (
            <View>

                <Text style={{color: ios_blue, marginLeft: 20}}>
                    当前角色 {this.state.radioSelectedData}
                </Text>
                <View
                    style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>
                    {
                        radioData.map((gender) =>
                            <SelectMultipleButton
                                key={gender}
                                multiple={false}
                                value={gender}
                                displayValue={gender}
                                selected={this.state.radioSelectedData === gender}
                                singleTap={(valueTap) => this._singleTapRadioSelectedButtons(valueTap, gender)}/>
                        )
                    }
                </View>
            </View>
        )
    }

    _singleTapRadioSelectedButtons(valueTap, gender) {
        this.setState({
            radioSelectedData: gender
        })
    }
}

const styles = StyleSheet.create({
    cover: {
        flex: 1,
        backgroundColor: 'white'
    },
    dropdown_6: {
        flex: 1,
        backgroundColor: 'gray'
    },
    dropdown_6_image: {
        width: 40,
        height: 40,
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
        textAlign: 'center',
    },
    dia_btn_warpper: {
        flexDirection: 'row',
    },
    dia_btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textDescription: {
        marginLeft: 10,
        color: 'gray'
    }
});