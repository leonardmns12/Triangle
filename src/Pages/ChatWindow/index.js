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
import { sendMessage , checkMessage , addChatDatabase , updateRead} from '../../Config/Redux/restApi/';
import firebase from '../../Config/Firebase/';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
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
    const [loading, setLoading] = useState(false)
    const sendMessages = async () => {
        const res = await getmsgid()
        const token = await getReceiverToken(chatState.receiver)
        if(imageUri !== ''){
            setLoading(true)
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
                    receiver : chatState.receiver,
                    timestamp : new Date().getTime(),
                    image : imagelink,
                    token : token,
                    downloaduri : {uri : downloaduri}
                }
                const data1 = {
                    message : chatState.sender + ' Sent an image',
                    sender : chatState.sender,
                    receiver : chatState.receiver,
                    timestamp : new Date().getTime(),
                    realtime : convertTime(new Date().getTime()),
                    isRead : false,
                    token : token
                }
                sendMessage(data,res);
                addChatDatabase(data1) 
                setLoading(false)
                setimageuri('')
            }).catch(e => {
                console.log('error while uploading => ' +e)
            })
             
        }else{      
            const data = {
                message : chatState.form.message,
                sender : chatState.sender,
                receiver : chatState.receiver,
                timestamp : new Date().getTime(),
                image : 'none',
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
        }
        // await getMessage(chatState.userId); 
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
    const [code ,setcode] = useState('')
    const renderItem = ({ item }) => (
        item.data.sender === chatState.sender ? (

            item.data.image === 'none' || item.data.image === undefined ? (
                <Receiver img={'null'} chatMessage={item.data.message} timestamp={item.data.timestamp}/>
            ) : (
                <Receiver img={item.data.downloaduri}  chatMessage={item.data.message} timestamp={item.data.timestamp}/>
            )
            
        ): (
            item.data.image === 'none' || item.data.image === undefined ? (
                <Sender photo={'null'} img={chatState.profileImg} chatMessage={item.data.message} timestamp={item.data.timestamp}/>
            ) : (
                <Sender photo={item.data.downloaduri} img={chatState.profileImg} chatMessage={item.data.message} timestamp={item.data.timestamp}/>
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
    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            <View style={[styles.chatHeader,{}]}>
                <Text style={[styles.headerText,{}]}>{chatState.receiver}</Text>
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
            <View style={{backgroundColor:'#F6F6F6' , height:50, alignItems: 'center', flexDirection: 'row'}}>
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
                        <TextInput value={chatState.form.message} onChangeText={(e)=>{onChangeInput(e,'message')}} style={[styles.input,{}]} placeholder="Type here . . ." multiline></TextInput> 
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
        backgroundColor:'#1BB0DF', 
        alignItems: 'center',
        flexDirection : 'row',
        paddingHorizontal: 20
    }
})

export default ChatWindow;