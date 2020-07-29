import React , { useEffect, Fragment , useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Avatar from '../../../../assets/chatWindow/avatar.svg';
const Sender = ({navigation, chatMessage , timestamp}) => {
    useEffect(()=>{
        convertTime()
    },[])
    function leadingzero(num) {
        var s = num+"";
        while (s.length < 2) s = "0" + s;
        return s;
    }
    const convertTime = () => {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        const date = new Date(timestamp)
        const day = weekday[date.getDay()]
        const hours = date.getHours();
        const minutes = leadingzero(date.getMinutes())
        setTime(hours+':'+minutes+' '+day)
        
    }
    const [time , setTime] = useState('')
    return(
    <Fragment>
        <View style={{flexDirection:'row', marginTop:10}}>
                    <Avatar height={30} width={30} />
                    <View style={[styles.chatText,{position:'relative'}]}>
                    <Text>{chatMessage}</Text>
                    </View>       
         </View>
         <Text style={{marginLeft:45,color:'black', fontSize:12}}>{time}</Text>
    </Fragment>
    )
}

const styles = StyleSheet.create({
    chatText : {
        marginLeft:10,
        borderRadius:18,
        paddingHorizontal: 15,
        maxWidth: 200,
        fontSize: 16,
        backgroundColor: '#00BFA6',
        color : 'black',
        paddingTop: 3,
        paddingBottom:3
    }
})

export default Sender;