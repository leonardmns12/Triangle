import React from 'react';
import { View , Text } from 'react-native'
const PostReplyComment = ({name , time , content}) => {
    return(
        <View style={{flexDirection:'row'}}>
            <View style={{height:30 , width:30 , borderWidth:1, borderRadius: 30}}></View>
            <View>
                <Text>{name}</Text>
                <Text>{content}</Text>
                <Text>{time}</Text>
            </View>
        </View>
    )
}

export default PostReplyComment;