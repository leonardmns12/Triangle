import React from 'react';
import { View , Text } from 'react-native'
const PostReplyComment = ({name , time , content}) => {
    return(
        <View style={{flexDirection:'row'}}>
            <View style={{height:30 , width:30 , borderWidth:1, borderRadius: 30}}></View>
            <View style={{marginLeft:10}}>
                <Text style={{fontWeight:"bold", fontSize:16}}>{name}</Text>
                <Text>{content}</Text>
                <Text style={{fontSize:11}}>{time}</Text>
            </View>
        </View>
    )
}

export default PostReplyComment;