import React , { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const friendlist = ({navigation , name, funct}) => {

    return(
        <TouchableOpacity onPress={funct}>
        <View style={[style.borderlist,{}]}>
            <View style={[style.friendprofile,{}]}></View>
            <Text style={[style.profilename,{}]}>{name}</Text>
        </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    borderlist : {
        borderWidth : 1,
        borderColor : '#707070',  
        height : 56,
        borderRadius: 30,
        flexDirection : 'row',
        marginBottom : 6
    },
    friendprofile : {
        borderWidth : 1,
        borderRadius: 20,
        height : 40,
        width : 40,
        borderColor : '#707070',
        marginLeft : 18,
        justifyContent: 'center',
        alignItems : 'center',
        marginTop : 6
    },
    profilename : {
        fontSize : 18,
        color : '#707070',
        alignItems : 'center',
        marginTop : 14,
        marginLeft : 5
    }
})

export default friendlist;