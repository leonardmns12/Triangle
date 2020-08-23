import React , { useEffect , useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
const friendlist = ({navigation , name, funct, url , isgroup}) => {

    return(
        <TouchableOpacity onPress={funct}>
        <View style={[style.borderlist,{}]}>
       
            <View style={[style.friendprofile,{}]}>
            {
                url.uri === 'https://firebasestorage.googleapis.com/v0/b/triang…=media&token=8e8f6b02-b104-4de1-8d04-d2887c764a6d' ? (
                    isgroup ? (
                        <Icon1 name="account-group" size={24} color={"#FFFFFF"} /> 
                    ) : (
                        <Icon name="user" size={20} color={"#FFFFFF"} />
                    )
                ) : (
                <Image source={url} style = {{width: 40, height: 40 , borderRadius: 20}}/>
                )
            }
            
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
    },
    friendprofile : {
        borderRadius: 20,
        height : 40,
        width : 40,
        marginLeft : 18,
        justifyContent: 'center',
        alignItems : 'center',
        marginTop : 6,
        backgroundColor:'#D1D4D9'
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