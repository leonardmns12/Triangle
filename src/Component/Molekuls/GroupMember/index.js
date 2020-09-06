import React from 'react';
import { View , Text , Image } from 'react-native'
const GroupMember = ({name , profileuri}) => {
    return(
        <View style={{flexDirection:'row', padding:"5%", borderBottomWidth:1, borderBottomColor:"#D3D3D3"}}>
            {
                !profileuri ? (
                    <View style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}}></View>
                ) : (
                    <Image source={profileuri} style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}} />
                )
            }
            <Text style={{marginLeft:"5%", marginTop:"3%", fontSize:16}}>{name}</Text>
        </View>
    )
}

export default GroupMember;