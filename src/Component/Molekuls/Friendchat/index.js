import React from 'react';
import { View , TouchableOpacity , StyleSheet , Text } from 'react-native';


const Friendchat = ({navigation , name, textmsg, timestamp}) => {

    return(
        <TouchableOpacity style={[styles.borderlist,{}]}>
            <View style={[styles.profileimg,{}]}></View>
            <View>
            <Text style={[styles.chatname,{}]}>{name}</Text>
            <Text style={[styles.chatmsg,{}]}>{textmsg}</Text>
            </View>
            <View style={[styles.timestamp,{}]}>
            <Text style={{fontSize : 10 , fontFamily : 'ITCKRISTEN', color:'#707070' }}>{timestamp}</Text>
            <Text style={{color:'#00BFA6' , fontSize:12}}>New</Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    borderlist : {
        borderRadius : 31,
        height : 50,
        marginHorizontal : 15,
        marginVertical : 5,
        flexDirection : 'row'
    },
    profileimg : {
        borderWidth : 1,
        borderColor : '#707070',
        width : 40,
        height : 40,
        borderRadius : 20,
        marginHorizontal : 14,
        marginVertical : 4
    },
    chatname : {
        fontSize : 12,
        color : '#010001',
        fontFamily : 'ITCKRISTEN',
        marginTop : '8%'
    },
    chatmsg : {
        fontSize : 12,
        color : '#707070',
        fontFamily : 'ITCKRISTEN'
    },
    timestamp : {
        position : 'absolute',
        right : '10%',
        marginVertical : '2%'
    }
})

export default Friendchat;