/**
 * 星期选择器数据
 */
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
export const weekData = [
    '取消',
    {
        component: 
        <View style={{flexDirection: 'row', }}>
            <Text style={{ flex:1 , fontSize:16, textAlign:'center', paddingTop: 5 }}>全选</Text>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <CheckBox 
                    value={true}></CheckBox>
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