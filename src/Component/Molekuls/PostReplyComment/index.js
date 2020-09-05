import React , {useEffect , useState} from 'react';
import { View , Text , Image } from 'react-native'
const PostReplyComment = ({name , time , content , profileImage}) => {
    useEffect(()=>{
        convertTime()
    },[])
    function leadingzero(num) {
        var s = num+"";
        while (s.length < 2) s = "0" + s;
        return s;
    }
    const convertTime = async () => {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        const date = new Date(time)
        const day = weekday[date.getDay()]
        const hours = date.getHours();
        const minutes = leadingzero(date.getMinutes())
        setTime(hours+':'+minutes+' '+day)
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