import React , { useEffect, useState , Suspense } from 'react';
import { View , Text, ScrollView, StyleSheet, AsyncStorage , ActivityIndicator, BackHandler , Modal , TouchableOpacity , Image , TextInput} from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import Friendlist from '../../../Component/Molekuls/Friendlist/';
import { Button } from '../../../Component/';
import { signOutUser , getUsername , checkPermission, getDisplayName , removeFriends , getId} from '../../../Config/Redux/restApi/';
import AddFriend from '../../../../assets/Home/addfriend.svg';
import Magnifier from '../../../../assets/Home/magnifier.svg';
import database from '@react-native-firebase/database';
import { useSelector , useDispatch } from 'react-redux';
import storage from '@react-native-firebase/storage';
import LeftLogo from '../../../../assets/chatWindow/left.svg';
import UserLogo from '../../../../assets/popupprofile/user.svg';
import BlockLogo from '../../../../assets/block.svg';
import ChatLogo from '../../../../assets/chat.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
const Home = ({navigation}) => {
    useEffect(()=>{
        ShowProfile();
        checkPermission()
        BackHandler.addEventListener('hardwareBackPress', cleardispatch);
        _retrieveUsername();
        // cleardispatch()
        return () => {
            console.log('exit')
            if(mount === true){
                unmounting()
            }
        }
    },[])
    const [mount, setmount] = useState(false)
    const unmounting = async () => {
        const username = await AsyncStorage.getItem('username')
        database().ref('users/' + username + '/friend').off()
    }
    const cleardispatch = () => {
        const data = []
        dispatch({type:'SET_LISTMSG' , value:data})
    }
    const ShowProfile = async () => {
        try{
            const async_profileuri = await AsyncStorage.getItem('profileuri')
            if(async_profileuri !== null){
                dispatch({type:'SET_SHOWPROFILE' , tipe:'profileuri', value:{uri:async_profileuri}})
            }
            const async_displayname = await AsyncStorage.getItem('displayname')
            const async_statusmsg = await AsyncStorage.getItem('statusmsg')
            if(async_statusmsg !== null) dispatch({type:'SET_SHOWPROFILE' , tipe:'statusmessage', value: async_statusmsg})
            if(async_displayname !== null) dispatch({type:'SET_SHOWPROFILE' , tipe:'displayname', value: async_displayname})
        }catch{
            console.log('data not found in storage')
        }
        const username = await AsyncStorage.getItem('username');
        const uri = await storage().ref('images/'+ username)
        .getDownloadURL().catch(e => {
            console.log('user doesnt have profile picture')
            return false
        })
        if(uri !== false){
            dispatch({type:'SET_SHOWPROFILE' , tipe:'profileuri', value:{uri:uri}})
            await AsyncStorage.setItem('profileuri', uri)
        }else{
            dispatch({type:'SET_SHOWPROFILE' , tipe:'profileuri', value: 'null'})
        }
        const dn = await getDisplayName(username, 'displayname')
        const sm = await getDisplayName(username , 'statusmessage')
        dispatch({type:'SET_SHOWPROFILE' , tipe:'displayname', value: dn})
        dispatch({type:'SET_SHOWPROFILE' , tipe:'statusmessage', value: sm})
        await AsyncStorage.setItem('displayname' , dn)
        await AsyncStorage.setItem('statusmsg' , sm)
    }
    const [profileImg , setProfileImg] = useState('')
    const [loading , setLoading] = useState(false);
    const HomeState = useSelector(state => state.homeReducer)
    const dispatch = useDispatch()
    const getAllFriend = (username) => { 
    const dataFriend = database().ref('users/' + username + '/friend');
    dataFriend.on('value',async function(snapshot){
      const data = []
      if(snapshot.val() === null || snapshot.val() === undefined){
        dispatch({type:'SET_HOMEFRIEND',  value: data});
        dispatch({type:'SET_ALLHOMEFRIEND',  value: data});
        await AsyncStorage.setItem(
            'friendlist',''
        )
      }else{
          Object.keys(snapshot.val()).map(key => {
            data.push({
                id: key,
                data: snapshot.val()[key],
                })
            })
            for(let i = 0; i < data.length; i++){
                const uri = await getProfileUri(data[i].data.friend)
                const displayname = await getDisplayName(data[i].data.friend , 'displayname')
                const statusmessage = await getDisplayName(data[i].data.friend , 'statusmessage')
                data[i] = {
                    ...data[i],
                    profileImg : uri,
                    displayname : displayname,
                    statusmessage : statusmessage
                }
            }
            dispatch({type:'SET_HOMEFRIEND',  value: data});
            dispatch({type:'SET_ALLHOMEFRIEND',  value: data});
            await AsyncStorage.setItem(
                'friendlist',JSON.stringify(data)
            )
        }
    })
    }
    const _retrieveUsername = async () => {
            try{
                const async_friendlist = await AsyncStorage.getItem('friendlist');
                if(async_friendlist !== null){
                    dispatch({type:'SET_HOMEFRIEND',  value: JSON.parse(async_friendlist)});
                    dispatch({type:'SET_ALLHOMEFRIEND',  value: JSON.parse(async_friendlist)});
                }
                
            }catch{
                console.log('no data found!')
            }
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
            //   alert(value)
              const res = await getAllFriend(value)
              if(res){
                  console.log('data null')
              }
            }
      };
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    const editProfile = async () => {
        navigation.navigate('EditProfile')
    }
    const addfriend = () => {
        navigation.navigate('FindFriend')
    }
    const gotochatroom = async (friend) => {
        const username = await AsyncStorage.getItem('username');
        dispatch({type: 'SET_RECEIVER' , value:modalUsername})
        dispatch({type: 'SET_SENDER' , value:username})
        navigation.navigate('ChatWindow')
    }
    const getProfileUri = async (friend) => {
        const img = await storage()
        .ref('images/' + friend)
        .getDownloadURL()
        .catch(e => {
            const url = 'https://firebasestorage.googleapis.com/v0/b/triang…=media&token=8e8f6b02-b104-4de1-8d04-d2887c764a6d'
            return url
        })
        if(img !== undefined){
            const url = { uri : img}
            return url
        }
    }
    
    const removeFriend = async (friend) => {
        const username = await AsyncStorage.getItem('username')
        const friendid = await getId(friend , 'friend' , username)
        const userid = await getId(username , 'friend' , friend)
        await removeFriends(username,friend,userid,friendid)
        // const msgid = getmsgid(username,friend)
        //future update , delete chat message , and stored image
        // await storage().ref('message/images/' +msgid +'/').delete().then(()=>{
        //     console.log('all storage deleted!')
        // }).catch(e => {
        //     console.log('cannot delete from storage => ' +e)
        // })
        setModalVisible(false)
    }
    const searchUser = (findtext) => {
        const data = HomeState.allfriend.filter(i => {
            const itemData = i.displayname.toUpperCase();
            
             const textData = findtext.toUpperCase();
              
             return itemData.indexOf(textData) > -1;  
        })
        dispatch({type:'SET_HOMEFRIEND' , value:data})
    }
    const [modalName , setModalName] = useState('')
    const [modalVisible , setModalVisible] = useState(false)
    const [modalUri , setModalUri] = useState({uri : 'https://firebasestorage.googleapis.com/v0/b/triang…=media&token=8e8f6b02-b104-4de1-8d04-d2887c764a6d'})
    const [modalStatus, setModalStatus] = useState('')
    const [modalUsername , setModalUsername] = useState('')

    const FriendsProf = async (friend) => {
        const username = await AsyncStorage.getItem('username')
        navigation.navigate('FriendsProfile')
        setModalVisible(false)
    }

    return(
        <View style={{flex:1 , position:'relative', backgroundColor:'#FFFFFF'}}>
            <Modal 
            animationType={"fade"}
            visible={modalVisible}
            transparent={true}
            >
                <View style={{backgroundColor:'#000000aa' , flex:1, justifyContent:'center'}}>
                    <View style={{backgroundColor:'rgba(255,255,255,0.85)',borderWidth:1,borderRadius:8, marginHorizontal:'20%', marginVertical:'30%' , flex:1}}>
                        <View style={{position:'absolute', padding:10, right:0}}>
                        <TouchableOpacity onPress={()=>{ setModalVisible(false) }}>
                            <LeftLogo width={30} height={30}/>
                        </TouchableOpacity>
                        </View> 
                            <View style={{padding:20, justifyContent:'center', alignItems:'center',flex:1}}>
                            {
                            modalUri.uri === 'https://firebasestorage.googleapis.com/v0/b/triang…=media&token=8e8f6b02-b104-4de1-8d04-d2887c764a6d' ? (
                                <View style={{width:130, height:130, borderWidth:1 , backgroundColor:'#FFFFFF' , borderRadius:100,marginBottom:16}}></View>
                            ): (
                                <Image source={modalUri} style = {{width: 130, height: 130 , borderRadius: 100,marginBottom:18}}/>
                            )
                            }     
                            <Text style={{fontSize:18 , fontFamily:'ITCKRISTEN', marginBottom:8}}>{modalName}</Text>
                            <Text>{modalStatus}</Text>
                           
                            </View>
                            <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', }}>
                                <TouchableOpacity onPress={()=>{gotochatroom(modalUsername) , setModalVisible(false)}} style={{backgroundColor:'#F3F3F3', flex:1, height:40, borderBottomLeftRadius:8, borderColor:'#777777', borderWidth:1, justifyContent:'center' , alignItems: 'center'}}>
                                    <ChatLogo width={18} height={18}/>
                                    <Text style={{fontSize:8}}>Chat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {FriendsProf(modalUsername)}} style={{backgroundColor:'#F3F3F3', flex:1,height:40, borderColor:'#777777', borderWidth:1, justifyContent:'center', alignItems:'center'}}>
                                    <UserLogo width={18} height={18}/>
                                    <Text style={{fontSize:8}}>Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{removeFriend(modalUsername)}} style={{backgroundColor:'#F3F3F3', flex:1, height:40, borderBottomRightRadius:8, borderColor:'#777777', borderWidth:1, justifyContent:'center', alignItems:'center'}}>
                                    <BlockLogo width={18} height={18}/>
                                    <Text style={{fontSize:8}}>Remove Friend</Text>
                                </TouchableOpacity>
                            </View>
                    </View>     
                </View> 
            </Modal>
            <View style={{flex:1, backgroundColor:'rgba(27,176,233,1)', borderBottomLeftRadius:41, borderBottomRightRadius:41, position:'relative',}}>
              <View style={{position:'relative'}}>
                  <View style={[style.addfriend,{width: 40, height: 38}]}>
                      <View style={[,{}]}>
                      <AddFriend onPress={addfriend} width={40} height={38} />
                      </View>
                  </View>
                <View style={{flexDirection:'row', marginTop: 43, marginBottom:7}}>
                    
                    {
                        HomeState.profileuri === 'null' ? (
                            <View style={[style.profileimg ,{}]}></View>   
                        ) :  (
                            <Image source={HomeState.profileuri} style={{width:50, height:50, borderRadius:100 , marginLeft:12}}/> 
                        )
                    }
                    <Text style={[style.profilename, {}]}>{HomeState.displayname}</Text>
                </View>
                {/* <View style={{width:220, marginBottom: 50}}>
                    <Text style={[style.bio , {}]}>{HomeState.statusmessage}</Text>
                </View> */}
               </View>
            <TouchableOpacity onPress={editProfile} style={{justifyContent:'center',position:'absolute',bottom:0,backgroundColor:'rgb(0,194,255)',borderBottomLeftRadius:41, borderBottomRightRadius:41,width:'100%', height:50}}>
            <Text style={{color:'white', fontSize:16, textAlign:'center', marginTop:3}}>
            Edit Profile
            </Text>
            </TouchableOpacity>
            {/* <Button title="Logout" funct={onClickLogout} /> */}
            </View>
            <View style={{flex:2}}>
                <View style={[style.input,{paddingHorizontal:'5%', elevation:5}]}>
                <View style={{position:'absolute',marginVertical:'2.5%', marginLeft: '6%'}}>
                <Icon name="search" color={'gray'} size={23} />
                </View>
                <TextInput onChangeText={(e)=>{searchUser(e)}}  placeholder="Search Friends" style={{}}></TextInput>
                </View>
                <View style={[style.homeinfo,{flexDirection : 'row'}]}>
                    <Text style={[style.friendngroup]}>
                    Friends & Group
                    </Text>
                </View> 
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{height:10}}></View>

               <View style={{display:'flex' , alignItems:'center'}}>
               </View>
                    {
                            HomeState.friendlist.map((id,key) => {
                                if(HomeState.friendlist == ''){
                                   return(
                                    <View style={{flex:1}}>
                                    <Text style={{textAlign:'center'}}>You dont have any friend</Text>
                                    </View>
                                   )
                               }
                               if(key === HomeState.friendlist.length - 1 && loading === true){
                                   setmount(true)
                               }
                               return(
                                   
                                   <Friendlist url={id.profileImg} key={key} name={id.displayname} funct={()=>{ 
                                       setModalVisible(true)
                                       setModalName(id.displayname)
                                       setModalUri(id.profileImg)
                                       setModalStatus(id.statusmessage)
                                       setModalUsername(id.data.friend)
                                    }} />
                               )
                           }) 
                    }
                <ActivityIndicator animating={loading}/>
            </ScrollView>
            </View>
            {/* <NavigationMenu home="active" gotoChat={()=>{gtchat('Chat')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoProfile={()=>{gtchat('Profile')}}     
            ></NavigationMenu> */}
        </View>
    )
}

const style = StyleSheet.create({
    profileimg : {
        width: 50,
        backgroundColor: '#FFFFFF',
        height: 50,
        marginLeft: 12,
        borderRadius: 100,
        borderColor: '#707070',
        borderWidth: 1
    },
    profilename : {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 12,
        paddingHorizontal:15,
        fontFamily : 'Google-Sans'
    },
    bio: {
        marginLeft: 12,
        color: '#FFFFFF',
    },
    addfriend : {
        position: 'absolute',
        right: 0,
    },

    homeinfo : {
        paddingHorizontal : 30

    },
    friendngroup : {
        fontFamily : 'ITCKRISTEN',
        fontSize : 18
    },
    input : {
        shadowColor : 'black',
        shadowOpacity: 0.1,
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
    }
})
//gasal
export default Home;