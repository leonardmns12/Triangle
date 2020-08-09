import React, { useEffect , useState } from 'react';
import { View , TouchableOpacity , StyleSheet , Text, Image, Animated } from 'react-native';
import storage from '@react-native-firebase/storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
const Friendchat = ({navigation, profileuri , name, textmsg, realtime ,isRead , funct , onPress}) => {
    useEffect(()=>{
        console.log('uri : ')
        console.log(profileuri)
    },[])
    const [msg , setmsg] = useState('')
    const removeString = (text) => {
        if(text !== undefined && text.length > 12){
            const res = text.substring(0, 12);
            const text2 = ' . . .'
            return res.concat(text2);
            
        }
        return text;
    }
    const RightAction = (progress ,dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
        })
            return(
                <TouchableOpacity onPress={onPress} style={{marginBottom:'5%'}}>
                    <View style={styles.rightAction}>
                        <Icon name="trash" color={"#FFF"} size={24} />
                    </View>
                </TouchableOpacity>
            )
    }
    const [time , setTime] = useState('')
    return(
        <Swipeable
            renderRightActions = {RightAction}
        >
            <TouchableOpacity onPress={funct} style={[styles.borderlist,{}]}>  
                {
                profileuri.uri.uri === 'undefined' ? (
                    <View style={[styles.profileimg,{}]}></View> 
                ) : (
                    <Image source={profileuri} style = {[styles.profileimg]}/>
                )
                }
                <View>
                <Text style={[styles.chatname,{}]}>{name}</Text>
                <Text style={[styles.chatmsg,{}]}>{removeString(textmsg)}</Text>
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
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    borderlist : {
        borderRadius : 5,
        height : 50,
        marginHorizontal : 15,
        marginVertical : 5,
        backgroundColor: '#FFFFFF',
        flexDirection : 'row'
    },
    profileimg : {
        backgroundColor: 'gray',
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
    },
    rightAction : {
        backgroundColor: '#dd2c00',
        justifyContent : 'center',
        alignItems : 'center',
        width:50,
        borderRadius:10,
        marginBottom:'3%',
        marginHorizontal : 15,
        marginVertical : 5,
        height:50
    },
    rightText : {
        color: '#FFF'
    }
})

export default Friendchat;