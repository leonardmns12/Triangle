import React, { useState, useEffect } from 'react';
import { View , Text , TouchableOpacity , StyleSheet , Image, Animated} from 'react-native';
import storage from '@react-native-firebase/storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Invitationlist = ({navigation , name , visible, funct , decline}) => {
    useEffect(()=>{
        getProfileImg(name)
    },[name])
    const [profileuri , setprofileuri] = useState(false);
    const getProfileImg = async (e) => {
        const res = await storage().ref('images/' + e)
        .getDownloadURL().catch(f => {
            console.log('error while fetching profile image ' + f)
            return false
        })
        if(res !== false){
            setprofileuri({uri:res})
        }else{
            setprofileuri(false)
        }
    }
    const LeftAction = (progress , dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        return(
            <View style={styles.leftAction}>
                <Animated.Text style={[styles.leftText , { transform: [{scale}]}]}>Swipe Left to Accept</Animated.Text>
            </View>
        )
    }
    const RightAction = (progress , dragX , onPress) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
        return(
            <TouchableOpacity onPress={decline} style={{marginBottom:'5%'}}>
                <View style={styles.rightAction}>
                    <Animated.Text style={[styles.rightText , { transform: [{scale}]}]}>Decline</Animated.Text>
                </View>
            </TouchableOpacity>
        )
    }
    return(
        <View style={{flex:1}}>
            {
                funct !== null ? (
                <Swipeable
                renderLeftActions = {LeftAction}
                onSwipeableLeftOpen = {funct}
                renderRightActions = {RightAction}
                >
                <View style={[styles.borderlist]}>
                    {
                        profileuri === false ? (
                            <View style={[styles.profileimg,{}]}></View>
                        ) : (
                            <View style={{marginTop:5}}><Image source={profileuri} style={{width:35 , height:35, borderRadius:20}}/></View>
                        )
                    }
                <Text style={[styles.proflename,{}]}>{name}</Text>
                </View>
                </Swipeable>
                ) : (
                <Swipeable
                renderRightActions = {RightAction}
                >
                <View style={[styles.borderlist]}>
                    {
                        profileuri === false ? (
                            <View style={[styles.profileimg,{}]}></View>
                        ) : (
                            <View style={{marginTop:5}}><Image source={profileuri} style={{width:35 , height:35, borderRadius:20}}/></View>
                        )
                    }
                <Text style={[styles.proflename,{}]}>{name}</Text>
                </View>
                </Swipeable>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    borderlist : {
        width : 300,
        borderRadius:5,
        flexDirection : 'row',
        backgroundColor:'#FFFFFF',
        paddingLeft: '5%',
        marginBottom:'3%'
    },
    proflename : {
        fontSize : 12,
        fontFamily : 'ITCKRISTEN',
        paddingLeft : 15,
        marginTop : 14
    },
    profileimg : {
        height : 35,
        width : 35,
        borderWidth : 1,
        borderColor : '#707070',
        borderRadius : 20,
        marginTop : 5
    },
    borderaction : {
        borderWidth : 1,
        borderColor : '#707070'
    },
    actionbutton : {
        marginHorizontal : 5,
        width : 40
    },
    actiontext : {
        fontSize : 10,
        textAlign : 'center',
    },
    leftText : {
        color: '#fFF',
        fontWeight : '600',
        padding: 20
    },
    leftAction : {
        backgroundColor : '#388e3c',
        justifyContent:'center',
        flex:1,
        borderRadius : 10,
        marginBottom:'3%',
    },
    rightAction : {
        backgroundColor: '#dd2c00',
        justifyContent : 'center',
        alignItems : 'flex-end',
        flex:1,
        borderRadius:10,
        marginBottom:'3%'
    },
    rightText : {
        color: '#fFF',
        fontWeight : '600',
        fontSize:16,
        padding:10,
    },

})

export default Invitationlist;