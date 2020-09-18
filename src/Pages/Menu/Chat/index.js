import React , { useEffect , useState } from 'react';
import { View , Text , StyleSheet, TouchableOpacity, ScrollView , FlatList , AsyncStorage} from 'react-native';
import LeftLogo from '../../../../assets/chatWindow/left.svg';
import Addfriend from '../../../../assets/Home/addfriend.svg';
import { TextInput } from 'react-native-gesture-handler';
import Friendchat from '../../../Component/Molekuls/Friendchat/';
import database from '@react-native-firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { getDisplayName , deleteChatlist , getGroupName } from '../../../Config/Redux/restApi/';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAddGroup from 'react-native-vector-icons/MaterialIcons';


const Chat = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    const dispatch = useDispatch();
    const chatState = useSelector(state => state.chatMenuReducer);
    const gotoFindUser = () => {
        // navigation.navigate('FindFriend');
        console.log(AsyncStorage.getItem('username'))
    }
    useEffect(()=>{
        starter()
        return () => {
            unmounting() 
        }
    },[])
    const starter = async () => {
        const username = await AsyncStorage.getItem('username')
        const async_chatlist = await AsyncStorage.getItem('chatlist')
        if(async_chatlist !== null){
        dispatch({type:'SET_CHATLIST' , value:JSON.parse(async_chatlist)})
        }
        await getChatData(username)
        
    }
    const unmounting = async () => {
        const username = await AsyncStorage.getItem('username')
        dispatch({type:'SET_CHATLIST' , value:chatState.allfriend})
        database().ref('users/' + username + '/chat').off()
    }
    const getProfilePicture = async (username) => {
        const res = await storage()
        .ref('images/' + username).getDownloadURL()
        .catch(e => { 
            return {uri : 'undefined'}
        })
        if(res !== undefined){
            return {uri : res}
        }
    }
    const addfriend = () => {
        navigation.navigate('FindFriend');
    }
    const getChatData = (username) => {
        const data = database()
        .ref('users/' + username + '/chat').on('value' ,async function(snapshot){
            if(snapshot.val() === null || snapshot.val() === undefined){
                const data = []
                dispatch({type:'SET_ALLFRIEND' , value:[]})
                dispatch({type:'SET_CHATLIST' , value:[]})
                await AsyncStorage.setItem('chatlist', '')
            }else{
                const data = []
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key],
                        })
                })
                for(let i = 0;  i < data.length; i++){
                    if(data[i].data.isGroup){
                        const groupname = await getGroupName(data[i].id);
                        console.log(data[i].id)
                        const profilepicture = await getProfilePicture(data[i].id)
                        data[i] = {
                            ...data[i],
                            displayname : groupname,
                            profilepicture : profilepicture
                        }
                    }else{
                        const displayname = await getDisplayName(data[i].id , 'displayname')
                        const profilepicture = await getProfilePicture(data[i].id)
                        console.log(profilepicture)
                        data[i] = {
                            ...data[i],
                            displayname : displayname,
                            profilepicture : profilepicture
                        }
                    }
                }
            dispatch({type:'SET_ALLFRIEND' , value:data.sort((a, b) => parseFloat(b.data.timestamp) - parseFloat(a.data.timestamp))})
            dispatch({type:'SET_CHATLIST' , value:data.sort((a, b) => parseFloat(b.data.timestamp) - parseFloat(a.data.timestamp))})
            await AsyncStorage.setItem('chatlist', JSON.stringify(data.sort((a, b) => parseFloat(b.data.timestamp) - parseFloat(a.data.timestamp))))
            }
            // setfriendlist(data)     
        })
    }
    const gotochatroom = async (friend,isGroup) => {
        const username = await AsyncStorage.getItem('username');
        dispatch({type: 'SET_RECEIVER' , value:friend})
        dispatch({type: 'SET_SENDER' , value:username})
        isGroup ? navigation.navigate('ChatWindow' , {groupId : friend}) : navigation.navigate('ChatWindow' , {groupId : false})  
    }
    const deletechatlist = async (friend) => {
        const username = await AsyncStorage.getItem('username')
        await deleteChatlist(username , friend)
    }
    const renderItem = ({item}) => {
        if(item.data.isGroup){
            return(
                <View style={{borderBottomWidth:1.3, borderColor:'#EFF3F5'}}>
                <Friendchat onPress={()=>{deletechatlist(item.id)}} profileuri={item.profilepicture} funct={()=>{gotochatroom(item.id,true)}} name={item.displayname} isRead={item.data.isRead} realtime={item.data.realtime} textmsg={item.data.message} />
                </View>
            )
        }else{
            return(  
                <View style={{borderBottomWidth:1.3, borderColor:'#EFF3F5'}}>
                <Friendchat onPress={()=>{deletechatlist(item.id)}} profileuri={item.profilepicture} funct={()=>{gotochatroom(item.id,false)}} name={item.displayname} isRead={item.data.isRead} realtime={item.data.realtime} textmsg={item.data.message} />
                </View>
            )
        }
    }
    const searchUser = (findtext) => {
        const data = chatState.allfriend.filter(i => {
            const itemData = i.displayname.toUpperCase();
            
             const textData = findtext.toUpperCase();
              
             return itemData.indexOf(textData) > -1;  
        })
        dispatch({type:'SET_CHATLIST' , value:data})
    }
    const NewGroup = () => {
        navigation.navigate('NewGroup')
    }
    return(
        <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={[styles.header,{}]}>
                <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                <LeftLogo height={33} width={33}></LeftLogo>
                </TouchableOpacity>
                <TouchableOpacity onPress={addfriend} style={{position:'absolute' , right:'3%', top:'8%'}}>
                <IconAddGroup onPress={NewGroup} size={38} name={"group-add"} color ={'white'}/> 
                </TouchableOpacity>
                <Text style={[styles.headerText,{}]}>Chat</Text>
            </View>
                <View style={[styles.input,{paddingHorizontal:'5%', elevation:5}]}>
                <View style={{position:'absolute',marginVertical:'2.5%', marginLeft: '6%'}}>
                <Icon name="search" color={'gray'} size={23} />
                </View>
                <TextInput onChangeText={(e)=>{searchUser(e)}} placeholder="Search Friends" style={{}}></TextInput>
                </View>
                <FlatList
                data = {chatState.chatlist}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            {/* <ScrollView style={{flex: 1, backgroundColor:'#FFFFFF'}}>
                {
                    chatState.chatlist.map((id, key) => {
                        const msg = removeString(id.data.message)
                        return(
                        <Friendchat key={key} profileuri={id.profilepicture} funct={()=>{gotochatroom(id.id)}} name={id.displayname} isRead={id.data.isRead} realtime={id.data.realtime} textmsg={msg} />
                        )
                    })
                }
            </ScrollView> */}
            <View style={{}}>
            {/* <NavigationMenu chat="active" gotoHome={()=>{gtchat('Home')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoProfile={()=>{gtchat('Profile')}}     
                ></NavigationMenu> */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header : {
        height : 57,
        backgroundColor : '#1BB0DF',
        flexDirection : 'row'
    },
    headerText : {
        fontSize : 20,
        fontFamily : 'ITCKRISTEN',
        color : '#FFFFFF',
        paddingTop : 15,
        marginLeft: 20
    },
    input : {
        shadowColor : 'black',
        shadowOpacity: 0.1,
        shadowRadius: 0.5,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        backgroundColor: '#FFFFFF',
        borderColor : '#707070',
        height:40,
        width:'95%',
        marginHorizontal: 10,
        borderRadius : 17,
        marginVertical : 13,
        paddingLeft : 50,
        fontFamily : 'ITCKRISTEN',
    }
})
export default Chat;