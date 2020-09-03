import React from 'react';
import { View , Text , Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
const PostReplyComment = ({name , time , content , profileImage}) => {
    return(
        <View style={{flexDirection:'row'}}>
            {
               !profileImage ? (
                    <View style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}}></View>
               ) : (
                   <Image source={{uri:profileImage}} style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}} />
               )
               
            }
            <View style={{marginLeft:"2%", marginTop:"2%"}}>
                <Text style={{fontWeight:"bold", fontSize:16, paddingBottom:"1%"}}>{name}</Text>
                <Text style={{paddingBottom:"2%"}}>{content}</Text>
                <Text style={{fontSize:11, fontFamily:'ITCKRISTEN', color:"grey"}}>{time}</Text>
            </View>
        </View>
    )
}

export default PostReplyComment;