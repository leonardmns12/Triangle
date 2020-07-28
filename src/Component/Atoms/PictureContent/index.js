import React , { Component } from 'react';
import {Text , StyleSheet ,View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PictureContent = () => {
    return(
        <View style={[styles.border]}></View>
    );
};
const styles =  StyleSheet.create({
    border : {
        marginHorizontal : '4.5%',
        width : 290,
        height : 120,
        borderColor : 'black',
        borderWidth : 1
    }
})
export default PictureContent;