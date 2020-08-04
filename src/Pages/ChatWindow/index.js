import React , { useEffect , useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator , FlatList } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import PaperPlaneLogo from '../../../assets/chatWindow/paper-plane.svg';
import ImagesLogo from '../../../assets/chatWindow/photos.svg';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import { Sender, Receiver } from '../../Component';
import { useDispatch, useSelector } from 'react-redux';
import { onChange } from 'react-native-reanimated';
import { sendMessage , checkMessage , addChatDatabase , updateRead} from '../../Config/Redux/restApi/';
import firebase from '../../Config/Firebase/';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
const ChatWindow = ({navigation}) => {
    useEffect(()=>{  
        getProfileImg()
        starter() 
        return () => {
            unmounting()
        }
        },[])
        const unmounting = async () => {
            const res = await getmsgid() 
            database().ref('messages/' + res).off()
        }
    const chatState = useSelector(state => state.chatReducer);
    const dispatch = useDispatch();
    const getReceiverToken = (username) => {
        const getToken = database().ref('users/' +username  + '/token').once('value').then(async function(snapshot){
            const data = []
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                    })
                })
            return data[0].data
        })
        return getToken;
      }
    const onChangeInput = (e , type) => {
        dispatch({type:'SET_MESSAGE', inputType: type, inputValue: e});
    }
    function leadingzero(num) {
        var s = num+"";
        while (s.length < 2) s = "0" + s;
        return s;
    }
    const convertTime = (val) => {
        const date = new Date(val)
        const hours = date.getHours();
        const minutes = leadingzero(date.getMinutes());
        return hours+':'+minutes
        
    }
    const sendMessages = async () => {
        const res = await getmsgid()
        const token = await getReceiverToken(chatState.receiver)
        
        const data = {
            message : chatState.form.message,
            sender : chatState.sender,
            receiver : chatState.receiver,
            timestamp : new Date().getTime(),
            token : token
        }
        const data1 = {
            message : chatState.form.message,
            sender : chatState.sender,
            receiver : chatState.receiver,
            timestamp : new Date().getTime(),
            realtime : convertTime(new Date().getTime()),
            isRead : false,
            token : token
        }
        dispatch({type:'SET_MESSAGE', inputType: 'sender', inputValue: chatState.sender});
        dispatch({type:'SET_MESSAGE', inputType: 'receiver', inputValue: chatState.receiver});
        dispatch({type:'SET_MESSAGE', inputType: 'timestamp', inputValue: new Date().getTime()});
        if( chatState.form.message.length > 0){
            sendMessage(data,res);
            addChatDatabase(data1)
            dispatch({type:'SET_MESSAGE', inputType: 'message', inputValue: ''});
        }
        // await getMessage(chatState.userId);
        
    }
    const onClickBack = () => {
        navigation.replace('Chat');
    }
    const starter = async () => {
        await updateRead(chatState.sender, chatState.receiver)
        try{         
        const res = await getmsgid()
        getMessage(res)
        }catch{
            console.log('error')
        }
    }
    const getProfileImg = async () => {
        const url = await storage()
        .ref('images/' + chatState.receiver)
        .getDownloadURL().catch( e => {
            console.log(e)
            dispatch({type:'SET_PROFILEIMG' , value : 'null'})  
        })
        if(url !== undefined){
            dispatch({type:'SET_PROFILEIMG' , value:{uri:url}})
        }
    }
    function getHash(input){
        var hash = 0, len = input.length;
        for (var i = 0; i < len; i++) {
          hash  = ((hash << 5) - hash) + input.charCodeAt(i);
          hash |= 0; // to 32bit integer
        }
        return hash;
      }
    const [msgid , setmsgid] = useState('')
    const getmsgid = () => {
        if(getHash(chatState.sender) > getHash(chatState.receiver)){
            return chatState.sender.concat(chatState.receiver)
        }else{
            return chatState.receiver.concat(chatState.sender)
        }
    }
    const getMessage = async (messageId) => {
        const getDataPost = firebase.database().ref('messages/' + messageId);
        getDataPost.on('value',async function(snapshot) {
        const data = []
        if(snapshot.val() === null || snapshot.val() === undefined){

        }else{
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                    })
                })
            dispatch({type:'SET_LISTMSG' , value:data.reverse()})
        }
        });
    }
    const [code ,setcode] = useState('')
    const renderItem = ({ item }) => (
        item.data.sender === chatState.sender ? (
            <Receiver  chatMessage={item.data.message} timestamp={item.data.timestamp}/>
        ): (
            <Sender img={chatState.profileImg} chatMessage={item.data.message} timestamp={item.data.timestamp}/>
        )
      );
    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            <View style={[styles.chatHeader,{}]}>
                <TouchableOpacity onPress={onClickBack}>
                    <LeftLogo width={33} height={33} />
                </TouchableOpacity>
                <Text style={[styles.headerText,{}]}>{chatState.receiver}</Text>
            </View>
            <View style={{flex:1 , backgroundColor : '#FFFFFF',paddingTop: 10, paddingHorizontal:10}}> 
                <FlatList
                inverted = {-1}
                data = {chatState.message}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            </View>

            {/* <ScrollView showsVerticalScrollIndicator={false} style={{flex:2 , backgroundColor:'#FFFFFF', paddingTop: 10, paddingHorizontal:10
            }} >
            {
                chatState.message.map((id,key) => {
                    if( id.data.sender === chatState.sender){
                    return <Receiver  key={key} chatMessage={id.data.message} timestamp={id.data.timestamp}/>
                    }else{
                    return <Sender img={chatState.profileImg} key={key} chatMessage={id.data.message} timestamp={id.data.timestamp}/>
                    }
                    
                }) 
            }
            </ScrollView> */}
            </View>
            <View style={{backgroundColor:'#FFFFFF', borderTopWidth:0.9 , height:50, alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity style={{marginLeft:15, marginRight:10}}>
                    <ImagesLogo height={25} width={25}/>
                </TouchableOpacity>
                <TextInput value={chatState.form.message} onChangeText={(e)=>{onChangeInput(e,'message')}} style={[styles.input,{}]} placeholder="Type here . . ."></TextInput>
                <TouchableOpacity onPress={sendMessages} style={{marginLeft:5}}>
                    <PaperPlaneLogo height={25} width={25}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input : {
        borderWidth:1,
        width: 267,
        height: 36,
        borderRadius: 18,
        fontWeight: 'bold',
        paddingLeft: 27,
        fontSize : 15,
    },
    headerText : {
        fontSize : 20,
        fontFamily : 'ITCKRISTEN',
        color : '#FFFFFF',
        marginLeft : 22
    },
    chatHeader : {
        height:57, 
        backgroundColor:'#00BFA6', 
        alignItems: 'center',
        flexDirection : 'row',
        paddingHorizontal: 20
    }
})

export default ChatWindow;