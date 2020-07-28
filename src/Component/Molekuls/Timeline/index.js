import React , { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChatIcon from '../../../../assets/navigation/comment-active.svg';
import {ContentPicture} from '../../../Component/Atoms'


const Timeline = ({navigation,profilename,content,commentcount,time,visible}) => {
  const isPicture = (visible) => {
      if(visible == 'block'){
        
        return <View style={[style.picture]}><ContentPicture /></View>

      }else{
        return <View style={[style.picture],{display:'none'}}><ContentPicture /></View>
      }
  }
    return (
        <View style = {[style.border]}> 
            <View style = {{flexDirection : 'row'}}>
                <View style = {[style.borderimage]}></View>
                  <Text style = {{marginVertical : 25}}>{profilename}</Text>
                <View style = {[style.commentbar]}>
                <ChatIcon width = {20} height = {20}/>
                  <Text style = {{marginLeft : 5 ,marginTop : '-8%'}}>{commentcount}</Text>
                </View>
            </View>
            <View style = {{ minHeight : 50, maxHeight : 360}}>
              
             
                    {isPicture(visible)}
            

                 <Text style = {{marginHorizontal : 20}} >{content}</Text> 

            </View>
            <View style = {[style.FooterContent]}>
                <Text style = {[style.Time]}>{time}</Text>
                <View style = {[style.ReplyButton]} ><Text style = {[style.ReplyText]}> Reply</Text></View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
     borderimage: {
        borderWidth : 1,
        borderColor : '#707070',
        borderRadius: 20,
        width : 46,
        height : 46,
        marginHorizontal : 12,
        marginVertical : 10,
    },
    commentbar: {
        position : "absolute",
        marginTop : 25 ,
        width : 20 ,
        height : 20 ,
        right : '20%' ,
        flexDirection :'row'
    },
    FooterContent: {
        
        bottom : '0%',
        position : "relative",
        flexDirection : 'row',
        marginHorizontal : 20,
        marginVertical : 20,
        opacity : 0.7,      
    },
    ReplyButton : {
            position : "absolute",
            right : 0,
            right : '10%'
    },
    ReplyText : {
        color : '#00BFA6',
        fontWeight : "bold",
    },

    border : {
        
        marginVertical : 15,
        marginHorizontal : 18,
        borderColor : 'black',
        borderWidth : 1,
        borderRadius : 30,
        width : 320,
        maxHeight : 360,   
        minHeight : 160
    },
    Time : {
         color : 'rgba(0,0,0,0.5)'
    },
    picture : {
    
        marginBottom : 10
    }
})

export default Timeline;