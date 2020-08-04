import React, { useEffect , useState } from 'react';
import { View , TouchableOpacity , StyleSheet , Text, Image } from 'react-native';
import storage from '@react-native-firebase/storage';

const Friendchat = ({navigation, profileuri , name, textmsg, realtime ,isRead , funct}) => {
    // useEffect(()=>{
    //     convertTime()
    //     console.log('berubah')
    // },[timestamp])
    
    const [time , setTime] = useState('')
    return(
        <TouchableOpacity onPress={funct} style={[styles.borderlist,{}]}>  
            {
               profileuri.uri === 'undefined' ? (
                <View style={[styles.profileimg,{}]}></View>
               ) : (
                <Image source={profileuri} style = {[styles.profileimg]}/>
               )
            }
            <View>
            <Text style={[styles.chatname,{}]}>{name}</Text>
            <Text style={[styles.chatmsg,{}]}>{textmsg}</Text>
            </View>
            <View style={[styles.timestamp,{}]}>
            <Text style={{fontSize : 10 , fontFamily : 'ITCKRISTEN', color:'#707070' }}>{realtime}</Text>
            {
                isRead === false ? (
                    <Text style={{color:'#00BFA6' , fontSize:12}}>New</Text>
                ) : null
            }
            
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