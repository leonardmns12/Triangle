import React , { useEffect, Fragment , useState } from 'react';
import { StyleSheet, Text, View, Image , Modal, Animated} from 'react-native';
import Avatar from '../../../../assets/chatWindow/avatar.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CloseButton from '../../../../assets/chatWindow/close.svg';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
const Sender = ({navigation, chatMessage , timestamp , photo , isGroup}) => {
    let mounted = true
    useEffect(()=>{
        convertTime()
        console.log(chatMessage.data.sender)
        return () => {
            mounted = false
        }
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
        const date = new Date(timestamp)
        const day = weekday[date.getDay()]
        const hours = date.getHours();
        const minutes = leadingzero(date.getMinutes())
        if(mounted)setTime(hours+':'+minutes+' '+day)
        await getProfileImg()
        
    }
    const [time , setTime] = useState('')
    const [modal , setmodal] = useState(false)
    const [image , setimg] = useState('null')
    const scale = React.useRef(new Animated.Value(1)).current;
    const handlePinch = Animated.event([{nativeEvent: {scale}}],{ useNativeDriver: true });
    const getProfileImg = async () => {
            const url = await storage()
            .ref('images/' + chatMessage.data.sender)
            .getDownloadURL().catch( e => {
                console.log(e)
                if(mounted)setimg('null')
            })
            if(url !== undefined){
                if(mounted)setimg({uri:url})
            }
    }
    return(
    <Fragment>
        <Text style={{marginLeft:45,color:'black', fontSize:12}}>{time}</Text>
        
        <View style={{flexDirection:'row', marginTop:10}}>

                    {
                        image === 'null' ? (
                         <Avatar height={30} width={30} />
                        ) : (
                        <Image source={image} style = {{width: 30, height: 30 , borderRadius: 20}}/>
                        )
                    }
                    {
                        photo !== 'null' ? (
                            <View>
                            {
                                isGroup ? <Text style={{marginLeft:10,marginBottom:'2%'}}>{chatMessage.data.sender}</Text> : null
                            }        
                            <TouchableOpacity  onPress={()=>{setmodal(true)}}  style={{marginLeft:'5%'}}>
                            <Image source={photo} style={{width:128 , height:128, borderRadius:20}}/>
                            </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                            {
                                isGroup ? <Text style={{marginLeft:10,marginBottom:'2%'}}>{chatMessage.data.sender}</Text> : null
                            }        
                            <View style={[styles.chatText,{position:'relative'}]}>
                            <Text style={{fontFamily : 'HelveticaMedium'}}>{chatMessage.data.message}</Text>
                            </View> 
                            </View> 
                        )
                    }
                         
         </View>
         <Modal visible={modal} 
         onRequestClose={() => { setmodal(false) }}>
             <View style={{right:10, top:10, position:'absolute' , height:30 , width:30}}>
                <CloseButton width={25} height={25} onPress={()=>{setmodal(false)}}  />
             </View>
             <View style={{zIndex:-1,justifyContent:'center', alignItems:'center', flex:1 , backgroundColor:'black'}}>
                
                {
                    photo !== 'null' ? (
                    <PinchGestureHandler onGestureEvent={handlePinch}>
                    <Animated.Image source={photo} resizeMode={'contain'} style={{width:'100%' , height:'100%'}}/>
                    </PinchGestureHandler>    
                    ) : null
                }
               
             </View>
         </Modal>
         
    </Fragment>
    )
}

const styles = StyleSheet.create({
    chatText : {
        marginLeft:10,
        borderBottomLeftRadius:18,
        borderBottomRightRadius:18,
        borderTopRightRadius:18,
        paddingHorizontal: 15,
        maxWidth: 200,
        fontSize: 16,
        backgroundColor: '#F6F6F6',
        color : 'black',
        paddingTop: '2%',
        paddingBottom: '2%',
        minHeight:25
    }
})

export default Sender;