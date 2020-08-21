import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SelectFriends = ({ }) => {
    return (
        <TouchableOpacity>
        <View style={[style.borderlist]}>
          <View style={[style.profilepicutre]}></View>
          <Text style={[style.profilename,{}]}>Name</Text>
          <View style = {[style.radiobutton]}></View>
        </View> 
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
        borderlist : {
            height : 56,
            borderRadius: 30,
            flexDirection : 'row',
            marginBottom : 6
        },
        profilepicutre : {
            borderWidth : 1,
            borderRadius: 20,
            height : 40,
            width : 40,
            marginLeft : 18,
            justifyContent: 'center',
            alignItems : 'center',
            marginTop : 6
        },
        profilename : {
            fontSize : 18,
            paddingLeft: 10,
            alignItems : 'center',
            marginTop : 14,
            marginLeft : 5,
            fontFamily: 'Google-Sans'
        },
        radiobutton : {
            width: 15,
            height: 15,
            borderWidth: 1,
            alignItems : 'center',
            marginTop : 20,
            marginLeft : '45%',

        }
    })

    export default SelectFriends;