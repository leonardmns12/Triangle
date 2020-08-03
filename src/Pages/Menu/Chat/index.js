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
    const [allfriend , setallfriend] = useState([])
    const [friendlist , setfriendlist] = useState([])
    const starter = async () => {
        const username = await AsyncStorage.getItem('username')
        await getChatData(username)
        
    }
    const unmounting = async () => {
        const username = await AsyncStorage.getItem('username')
        database().ref('users/' + username + '/chat').off()
    }
    const getChatData = (username) => {
        const data = database()
        .ref('users/' + username + '/chat').on('value' ,async function(snapshot){
            const data = []
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key],
                    })
            })
            for(let i = 0;  i < data.length; i++){
                const displayname = await getDisplayName(data[i].id , 'displayname')
                data[i] = {
                    ...data[i],
                    displayname : displayname
                }

            }
            // setfriendlist(data)
            setallfriend(data)
            dispatch({type:'SET_CHATLIST' , value:data})
        })
    }
    const searchUser = (findtext) => {
        const data = allfriend.filter(i => {
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


    return(
        <View style={{flex:1}}>
            <View style={[styles.header,{}]}>
                <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                <LeftLogo height={33} width={33}></LeftLogo>
                </TouchableOpacity>
                <TouchableOpacity onPress={gotoFindUser} style={{position:'absolute' , right:'3%', top:'8%'}}>
                <Addfriend height={40} width={38}></Addfriend>
                </TouchableOpacity>
                <Text style={[styles.headerText,{}]}>Chat</Text>
            </View>
                <View style={{ backgroundColor:'white'}}>
                <View style={{position:'absolute', marginVertical:20, marginLeft: 25}}>
                <Magnifier height={23} width={23} />
                </View>
                <TextInput onChangeText={(e)=>{searchUser(e)}} placeholder="Search Friends" style={[styles.input ,{}]}></TextInput>
                </View>
            <ScrollView style={{flex: 1, backgroundColor:'#FFFFFF'}}>
                {
                    chatState.chatlist.map((id, key) => {
                        const msg = removeString(id.data.message)
                        return(
                        <Friendchat key={key} name={id.displayname} timestamp={"19:00"} textmsg={msg} />
                        )
                    })
                }
            </ScrollView>
            <View style={{}}>
            <NavigationMenu chat="active" gotoHome={()=>{gtchat('Home')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoProfile={()=>{gtchat('Profile')}}     
                ></NavigationMenu>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header : {
        height : 57,
        backgroundColor : '#00BFA6',
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
        borderWidth : 1,
        borderColor : '#707070',
        height:40,
        width:340,
        marginHorizontal: 10,
        borderRadius : 17,
        marginVertical : 13,
        paddingLeft : 50,
        fontFamily : 'ITCKRISTEN'
    }
})

export default Chat;