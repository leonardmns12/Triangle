import React from 'react';
import { View , Text} from 'react-native'
const GroupMember = ({name}) => {
    return(
        <View style={{flexDirection:'row', padding:"5%", borderBottomWidth:1, borderBottomColor:"#D3D3D3"}}>
            <View style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}}></View>
            <Text style={{marginLeft:"5%", marginTop:"3%", fontSize:16}}>{name}</Text>
        </View>
    )
}

export default GroupMember;