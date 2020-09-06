import React , { useEffect , useState } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChatIcon from '../../../../assets/navigation/comment-active.svg';
import {ContentPicture} from '../../../Component/Atoms'


const Timeline = ({navigation,profileImage, profilename,content,commentcount,time,visible,onpress}) => {
    useEffect(()=>{
        convertTime()
    },[])
    var periods = {
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000
      };
function formatTime(timeCreated) {
    var diff = Date.now() - timeCreated;
  
    if (diff > periods.month) {
      // it was at least a month ago
      return Math.floor(diff / periods.month) + " month ago";
    } else if (diff > periods.week) {
      return Math.floor(diff / periods.week) + " week ago";
    } else if (diff > periods.day) {
      return Math.floor(diff / periods.day) + " day ago";
    } else if (diff > periods.hour) {
      return Math.floor(diff / periods.hour) + " hours ago";
    } else if (diff > periods.minute) {
      return Math.floor(diff / periods.minute) + " minute ago";
    }
    return "Just now";
  }
    const convertTime = async () => {
        setTime(formatTime(time)) 
    }
    const [times , setTime] = useState('')
  
    const isPicture = (visible) => {
      if(visible == 'block'){
        
        return <View style={[style.picture]}><ContentPicture /></View>

      }else{
        return <View style={[style.picture],{display:'none'}}></View>
      }
  }

    return (
        <TouchableOpacity onPress={onpress} style = {[style.border]}> 
            <View style = {{flexDirection : 'row'}}>
            {
                !profileImage ? (
                    <View style={[style.borderimage]}></View>
                ) : (
                    <Image source={{uri:profileImage}}  style={[style.borderimage]} />
                )
                
            }
                <Text style = {{marginVertical : 25}}>{profilename}</Text>
                <View style = {[style.commentbar]}>
                <ChatIcon width = {20} height = {20}/>
                  <Text style = {{marginLeft : 5 ,marginTop : '-8%'}}>{commentcount}</Text>
                </View>
            </View>
            <View style = {{ minHeight : 35, maxHeight : 350}}>
            
                    {isPicture(visible)}

                 <Text style = {{marginHorizontal : 20}} >{content}</Text> 

            </View>
            <View style = {[style.FooterContent]}>
                <Text style = {[style.Time]}>{times}</Text>
                <View style = {[style.ReplyButton]} ><Text style = {[style.ReplyText]}> Reply</Text></View>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
     borderimage: {
        borderWidth : 1,
        borderColor : '#000000',
        borderRadius: 100,
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
        backgroundColor: '#FAFAFA',
        shadowColor:'#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius:5.46,
        elevation: 9,
        borderRadius : 30,
        width : '90%',
        maxHeight : 360,   
        minHeight : 160,
    },
    Time : {
        color : 'black',
    },
    picture : {
    
        marginBottom : 10
    }
})

export default Timeline;