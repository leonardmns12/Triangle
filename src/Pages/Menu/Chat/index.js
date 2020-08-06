import React , { useEffect , useState } from 'react';
import { View , Text , StyleSheet, TouchableOpacity, ScrollView , FlatList , AsyncStorage} from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import LeftLogo from '../../../../assets/chatWindow/left.svg';
import Addfriend from '../../../../assets/Home/addfriend.svg';
import Magnifier from '../../../../assets/Home/magnifier.svg';
import { TextInput } from 'react-native-gesture-handler';
import Friendchat from '../../../Component/Molekuls/Friendchat/';
import database from '@react-native-firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { getDisplayName } from '../../../Config/Redux/restApi/';
import storage from '@react-native-firebase/storage';
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

            }else{
                const data = []
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key],
                        })
                })
                for(let i = 0;  i < data.length; i++){
                    const displayname = await getDisplayName(data[i].id , 'displayname')
                    const profilepicture = await getProfilePicture(data[i].id)
                    console.log(profilepicture)
                    data[i] = {
                        ...data[i],
                        displayname : displayname,
                        profilepicture : profilepicture
                    }
    
                }
            dispatch({type:'SET_ALLFRIEND' , value:data.sort((a, b) => parseFloat(b.data.timestamp) - parseFloat(a.data.timestamp))})
            dispatch({type:'SET_CHATLIST' , value:data.sort((a, b) => parseFloat(b.data.timestamp) - parseFloat(a.data.timestamp))})
            }
            // setfriendlist(data)     
        })
    }
    const searchUser = (findtext) => {
        const data = chatState.allfriend.filter(i => {
            const itemData = i.displayname.toUpperCase();
            
             const textData = findtext.toUpperCase();
              
             return itemData.indexOf(textData) > -1;  
        })
        dispatch({type:'SET_CHATLIST' , value:data})
    }
    const removeString = (text) => {
        if(text.length >= 12) {
            const res = text.substring(0, 12);
            const text2 = ' . . .'
            return res.concat(text2);
        }
        
        return text;
    }
    const gotochatroom = async (friend) => {
        const username = await AsyncStorage.getItem('username');
        dispatch({type: 'SET_RECEIVER' , value:friend})
        dispatch({type: 'SET_SENDER' , value:username})
        navigation.navigate('ChatWindow')
    }
    return(
        <View style={{flex:1}}>
            <View style={[styles.header,{}]}>
                <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                <LeftLogo height={33} width={33}></LeftLogo>
                </TouchableOpacity>
                <TouchableOpacity onPress={addfriend} style={{position:'absolute' , right:'3%', top:'8%'}}>
                <Addfriend height={40} width={38}></Addfriend>
                </TouchableOpacity>
                <Text style={[styles.headerText,{}]}>Chat</Text>
            </View>
                <View style={{ backgroundColor:'white', paddingHorizontal:'5%'}}>
                {/* <View style={{marginVertical:20, marginLeft: 25}}>
                <Magnifier height={23} width={23} />
                </View> */}
                <TextInput elevation={5} onChangeText={(e)=>{searchUser(e)}} placeholder="Search Friends" style={[styles.input ,{}]}></TextInput>
                </View>
            <ScrollView style={{flex: 1, backgroundColor:'#FFFFFF'}}>
                {
                    chatState.chatlist.map((id, key) => {
                        console.log(id.profilepicture)
                        const msg = removeString(id.data.message)
                        return(
                        <Friendchat key={key} profileuri={id.profilepicture} funct={()=>{gotochatroom(id.id)}} name={id.displayname} isRead={id.data.isRead} realtime={id.data.realtime} textmsg={msg} />
                        )
                    })
                }
            </ScrollView>
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
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 0.5,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        backgroundColor: 'white',
        borderColor : '#707070',
        height:40,
        width:'95%',
        marginHorizontal: 10,
        borderRadius : 17,
        marginVertical : 13,
        paddingLeft : 50,
        fontFamily : 'ITCKRISTEN',
        zIndex:-1
    }
})
export default Chat;