import React , { Fragment , useEffect, useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';

const Receiver = ({navigation,chatMessage,timestamp}) => {
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
        const minutes = leadingzero(date.getMinutes());
        setTime(hours+':'+minutes + ' ' +day)
        
    }
    const [time , setTime] = useState('')
    return(
    <Fragment>
        <View style={{ alignItems:'flex-end', marginBottom:'4%'}}>
                <Text style={[styles.receiverText,{}]}>{chatMessage}</Text>
                <Text style={{fontSize:12,marginRight:5}}>{time}</Text>
        </View>
        
    </Fragment>
    )
}

const styles = StyleSheet.create({
    receiverText : {
        backgroundColor:'#00BFA6', 
        maxWidth: 200,
        borderRadius:18,
        paddingHorizontal: 15,
        paddingTop: 3,
        paddingBottom: 3,
        minHeight:30
    }
})
export default Receiver;