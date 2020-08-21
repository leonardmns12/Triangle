import React from 'react';
import { View , Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
const PostReplyComment = ({name , time , content}) => {
    return(
        <View style={{flexDirection:'row'}}>
            <View style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}}></View>
            <View style={{marginLeft:"2%", marginTop:"2%"}}>
                <Text style={{fontWeight:"bold", fontSize:16, paddingBottom:"1%"}}>{name}</Text>
                <Text style={{paddingBottom:"2%"}}>{content}</Text>
                <Text style={{fontSize:11, fontFamily:'ITCKRISTEN', color:"grey"}}>{time}</Text>
            </View>
        </View>
    )
}

export default PostReplyComment;