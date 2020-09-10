import React , { Fragment , useEffect, useState } from 'react';
import { StyleSheet, Text, View , Image , TouchableOpacity , Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CloseButton from '../../../../assets/chatWindow/close.svg';
const Receiver = ({navigation,chatMessage,timestamp,img,missed}) => {
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
    const [modal , setmodal] = useState(false)
    return(
    <Fragment>
        {
            img !== 'null' ? (
                <View style={{alignItems:'flex-end',marginTop:10}}>
                <TouchableOpacity onPress={()=>{setmodal(true)}}  style={{marginBottom:'4%'}}>
                   <Image  source={img} style = {{width: 128 , height:128, borderRadius:20}}/>
                </TouchableOpacity> 
                </View>
            ) : (

                !missed ? (

                <View style={{ alignItems:'flex-end',marginTop:10}}>
                    <Text style={[styles.receiverText,{}]}>{chatMessage}</Text>
                    <Text style={{fontSize:12,marginRight:5}}>{time}</Text>
                </View> ) : 
                <View style={{ alignItems:'center'}}>
                    <View style={[styles.missedtext,{}]}>
                    <Icon name="phone-missed" size={16} color={'red'}/>
                    <Text style={{color:'black',marginLeft:'2%'}}>{chatMessage}</Text>
                    </View>
                    {/* <Text style={{fontSize:12,marginRight:5}}>{time}</Text> */}
                </View>
            )
        }
        <Modal
        visible={modal}
        onRequestClose={() => { setmodal(false) }}
        >
            <View style={{right:10, top:10, position:'absolute' , height:30 , width:30}}>
            <CloseButton width={25} height={25} onPress={()=>{setmodal(false)}}  />
            </View>
            <View style={{zIndex:-1,justifyContent:'center', alignItems:'center', flex:1 , backgroundColor:'black'}}>
            
            {
                img !== 'null' ? (
                <Image source={img} resizeMode={'contain'} style={{width:'100%' , height:'100%'}}/> 
                ) : null
            }
            
            </View>
        </Modal>
    </Fragment>
    )
}

const styles = StyleSheet.create({
    receiverText : {
        backgroundColor:'#1492E6', 
        maxWidth: 200,
        color: '#FFFFFF',
        borderRadius:18,
        paddingHorizontal: 15,
        paddingTop: '2%',
        paddingBottom:'3%',
        minHeight:30,
        fontFamily : 'HelveticaMedium',
    },
    missedtext : {
        backgroundColor:'rgba(115,116,118,0.45)', 
        maxWidth: 200,
        color: '#FFFFFF',
        borderRadius:8,
        paddingHorizontal: 15,
        paddingTop: '2%',
        paddingBottom:'3%',
        minHeight:30,
        fontFamily : 'HelveticaMedium',
        flexDirection:'row',
        marginTop:10
    }
})
export default Receiver;