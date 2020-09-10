import React , { useEffect , useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator , FlatList } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import PaperPlaneLogo from '../../../assets/chatWindow/paper-plane.svg';
import Attachment from '../../../assets/chatWindow/attachment.svg';
import ImagesLogo from '../../../assets/chatWindow/ar-camera.svg';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import { Sender, Receiver } from '../../Component';
import { useDispatch, useSelector } from 'react-redux';
import { onChange } from 'react-native-reanimated';
import { sendMessage , checkMessage , addChatDatabase , updateRead , getGroupMember2 , getMemberToken } from '../../Config/Redux/restApi/';
import firebase from '../../Config/Firebase/';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import CallComponent from '../../Component/Molekuls/CallComponent/';


const ChatWindow = ({route,navigation}) => {
    useEffect(()=>{  
        getProfileImg()
        starter() 
        combineToken()
        return () => {
            unmounting()
        }
        },[])
        const unmounting = async () => {
            const res = await getmsgid() 
            database().ref('messages/' + res).off()
        }

    const combineToken = async () => {
        if(!route.params.groupId){

        }else{  
            const res = await getGroupMember2(route.params.groupId)
            const data = []
            console.log(res)
            for(let i = 0 ; i < res.length; i++){
                const token = await getMemberToken(res[i])
                console.log(token)
                data.push(token)
            }
            setToken(data) 
    }
}
    const [listToken , setToken] = useState([])
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
    const [loading, setLoading] = useState(false)
    const sendMessages = async () => {
        if(imageUri !== ''){
            setLoading(true)
            const res = !route.params.groupId ? await getmsgid() : route.params.groupId
            const imagelink = 'message/images/' + res +'/' + imageUri.fileName
            await storage().ref(imagelink)
            .putFile(imageUri.path).then(async(snapshot)=>{
                console.log('image successfully uploaded')
                const downloaduri = await storage()
                .ref(imagelink).getDownloadURL().catch(e=>{
                    console.log('error while getting image uploaded' + e)
                })
                const data = {
                    message : 'Sent you an image',
                    sender : chatState.sender,
                    receiver : !route.params.groupId ? chatState.receiver : route.params.groupId,
                    timestamp : new Date().getTime(),
                    image : imagelink,
                    token : !route.params.groupId ? await getReceiverToken(chatState.receiver) : listToken.toString(),
                    downloaduri : {uri : downloaduri},
                    isGroup : !route.params.groupId ? false : true
                }
                const data1 = {
                    message : chatState.sender + ' Sent an image',
                    sender : chatState.sender,
                    receiver : chatState.receiver,
                    timestamp : new Date().getTime(),
                    realtime : convertTime(new Date().getTime()),
                    isRead : false,
                    token : !route.params.groupId ? await getReceiverToken(chatState.receiver) : listToken.toString(),
                    isGroup : !route.params.groupId ? false : route.params.groupId
                }
                sendMessage(data,res);
                addChatDatabase(data1) 
                setLoading(false)
                setimageuri('')
            }).catch(e => {
                console.log('error while uploading => ' +e)
            })
             
        }else{     
            const res = await getmsgid()
            const data = {
                message : chatState.form.message,
                sender : chatState.sender,
                receiver : chatState.receiver,
                timestamp : new Date().getTime(),
                image : 'none',
                token : !route.params.groupId ? await getReceiverToken(chatState.receiver) : listToken.toString(),
                isGroup : !route.params.groupId ? false : true,
                missed : false,
                call : false
            }

            const data3 = {
                message : chatState.form.message,
                sender : chatState.sender,
                receiver : !route.params.groupId ? chatState.receiver : route.params.groupId,
                timestamp : new Date().getTime(),
                realtime : convertTime(new Date().getTime()),
                isRead : false,
                token : listToken.toString(),
                isGroup : !route.params.groupId ? false : true,
                missed : false,
                call : false
            }
            dispatch({type:'SET_MESSAGE', inputType: 'sender', inputValue: chatState.sender});
            dispatch({type:'SET_MESSAGE', inputType: 'receiver', inputValue: chatState.receiver});
            dispatch({type:'SET_MESSAGE', inputType: 'timestamp', inputValue: new Date().getTime()});
            if( chatState.form.message.length > 0){
                console.log(route.params.groupId)
                !route.params.groupId ? (sendMessage(data,res),addChatDatabase(data3)) : (sendMessage(data,route.params.groupId),addChatDatabase(data3))
                dispatch({type:'SET_MESSAGE', inputType: 'message', inputValue: ''});
            }   
        }
        setheight(41)
        // await getMessage(chatState.userId); 
    }
    const starter = async () => {
        if(route.params.groupId !== false){
            await updateRead(chatState.sender, chatState.receiver , true)
        }else{
            await updateRead(chatState.sender, chatState.receiver , false)
        }
        
        try{       
        if(!route.params.groupId){
            const res = await getmsgid()
            getMessage(res)
        }else{
            getMessage(route.params.groupId)
        }
        
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
    const [imageUri , setimageuri] = useState('')
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
    const [height ,setheight] = useState(1)
    const renderItem = ({ item }) => (
        item.data.sender === chatState.sender ? (

            item.data.call ? (
                <CallComponent funct={()=>{gotoCall()}} message={item.data.message} isSender={true} /> 
            ) : (
                item.data.image === 'none' || item.data.image === undefined ? (
                    <Receiver img={'null'} chatMessage={item.data.message} timestamp={item.data.timestamp}
                    missed={item.data.missed}
                    />
                ) : (
                    <Receiver img={item.data.downloaduri}  chatMessage={item.data.message} timestamp={item.data.timestamp} />
                )
            )

            
        ): (
            item.data.image === 'none' || item.data.image === undefined ? (
                !route.params.groupId ?       
                item.data.call ? (
                    <CallComponent funct={()=>{gotoCall()}} sender={item.data.sender} photo={'null'} message={item.data.message} isSender={false} image={item.data.downloaduri} /> 
                ) : (
                    <Sender isGroup={false} photo={'null'} img={chatState.profileImg} chatMessage={item} timestamp={item.data.timestamp}
                    missed={item.data.missed}
                    />
                )     
                : 
                <Sender photo={'null'} isGroup={true} img={chatState.profileImg} chatMessage={item} timestamp={item.data.timestamp}/>
            ) : (
                !route.params.groupId ? <Sender photo={item.data.downloaduri} chatMessage={item} timestamp={item.data.timestamp}/> :
                <Sender photo={item.data.downloaduri} isGroup={true} chatMessage={item} timestamp={item.data.timestamp}/>
            )
            
        )
      );
      const chooseFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            let source = response;
            
            setimageuri(source)
            
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          }
        });
      };

      const gotoCall = async () => {
        navigation.navigate('CallScreen' , {msgid : !route.params.groupId ? await getmsgid() : route.params.groupId , isGroup : route.params.groupId
        , token : !route.params.groupId ? await getReceiverToken(chatState.receiver) : listToken.toString(), receiver : !route.params.groupId ? chatState.receiver : null
        })
      }

    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            <View style={[styles.chatHeader,{}]}>
            <Text style={[styles.headerText,{}]}>{chatState.receiver}</Text>
            <Icon style={{position:'absolute' , right:10}} onPress={gotoCall} name="call" color="white" size={24} />
            </View>
            <View style={{flex:1 , backgroundColor : '#FFFFFF',paddingTop: 10, paddingHorizontal:10}}> 
                <FlatList
                inverted = {-1}
                data = {chatState.message}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            <ActivityIndicator color={'#1BB0DF'} animating={loading}/>
            </View>
            </View>
            <View style={{backgroundColor:'#F6F6F6' , height:'auto',minHeight:50, alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity onPress={chooseFile} style={{marginLeft:15, marginRight:10}}>
                    <ImagesLogo height={25} width={25}/>
                </TouchableOpacity>
                {
                    imageUri !== '' ? (
                        <View style={{flexDirection:'row', marginLeft:20 , maxWidth:'60%', maxHeight:'30%'}}>
                            <Attachment width={18} height={18}/>
                            <Text style={{marginHorizontal:'5%', fontSize:12}}>{imageUri.fileName}</Text>
                        </View>  
                    ) : (
                        <TextInput value={chatState.form.message} onChangeText={(e)=>{onChangeInput(e,'message')}} style={[styles.input,{height : Math.max(24, height)}]} placeholder="Type here . . ." multiline={true}
                        onContentSizeChange={(event)=>{setheight(event.nativeEvent.contentSize.height)}}
                        ></TextInput> 
                    )
                }       
                <View style={{position:'absolute', right:'5%'}}>
                <TouchableOpacity onPress={sendMessages} style={{justifyContent:'center',alignItems:'center',marginLeft:5 , backgroundColor: '#1BB0DF' , height:32 , width:32 , borderRadius:30, }}>
                    <View style={{marginLeft:'-6%'}}>
                    <PaperPlaneLogo height={20} width={20}/>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input : {
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 0.5,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        backgroundColor: 'white',
        elevation:8,
        width: '70%',
        borderRadius: 10,
        fontWeight: 'bold',
        padding: 15,
        fontSize : 10,
    },
    headerText : {
        fontSize : 20,
        fontFamily : 'ITCKRISTEN',
        color : '#FFFFFF',
        marginLeft : 22
    },
    chatHeader : {
        height:57, 
        backgroundColor:'#1BB0DF', 
        alignItems: 'center',
        flexDirection : 'row',
        paddingHorizontal: 20
    }
})

export default ChatWindow;