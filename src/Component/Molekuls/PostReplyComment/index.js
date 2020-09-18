import React , {useEffect , useState} from 'react';
import { View , Text , Image } from 'react-native'
const PostReplyComment = ({name , time , content , profileImage}) => {
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
                <Text style={{fontSize:11, fontFamily:'ITCKRISTEN', color:"grey"}}>{times}</Text>
            </View>
        </View>
    )
}

export default PostReplyComment;