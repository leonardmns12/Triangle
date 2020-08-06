import React, { useState, useEffect } from 'react';
import { View , Text , TouchableOpacity , StyleSheet , Image} from 'react-native';
import storage from '@react-native-firebase/storage';

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
    const checkvisible = (visible) => {
        if(visible === 'none'){
        }else{
        return <TouchableOpacity onPress={funct} style={[styles.actionbutton,{}]}>
        <View style={[styles.borderaction,{}]}>
        <Text style={[styles.actiontext,{backgroundColor: '#00BFA6'}]}>Accept</Text>
        </View>
        </TouchableOpacity>
        }
    }
    return(
        <View style={[styles.borderlist,{marginVertical : 5}]}>
            {
                profileuri === false ? (
                    <View style={[styles.profileimg,{}]}></View>
                ) : (
                    <View style={{marginTop:5}}><Image source={profileuri} style={{width:35 , height:35, borderRadius:20}}/></View>
                )
            }
            
            <Text style={[styles.proflename,{}]}>{name}</Text>
            <View style={{position : 'absolute', right : 5, flexDirection : 'row', top : '35%'}}>
                {
                    checkvisible(visible)
                }
                <TouchableOpacity onPress={decline} style={[styles.actionbutton,{}]}>
                <View style={[styles.borderaction,{}]}>
                <Text style={[styles.actiontext,{backgroundColor : '#CE5454'}]}>Decline</Text>
                </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    borderlist : {
        width : 300,
        borderRadius : 31,
        height : 50,
        flexDirection : 'row'
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
        marginLeft: '5%',
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
    }

})

export default Invitationlist;