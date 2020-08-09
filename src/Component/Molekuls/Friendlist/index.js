import React , { useEffect , useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const friendlist = ({navigation , name, funct, url }) => {

    return(
        <TouchableOpacity onPress={funct}>
        <View style={[style.borderlist,{}]}>
       
            <View style={[style.friendprofile,{}]}>
            <Image source={url} style = {{width: 40, height: 40 , borderRadius: 20}}/>
            </View>
            <Text style={[style.profilename,{}]}>{name}</Text>
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
    friendprofile : {
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
    }
})

export default friendlist;