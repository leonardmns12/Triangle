import React , { useEffect, useState , Fragment } from 'react';
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
import Icon1 from 'react-native-vector-icons/Feather';
import { FlatList } from 'react-native-gesture-handler';
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
    const getAllGroup = (username) => {
    const dataGroup = database().ref('users/' + username + '/group');
    dataGroup.on('value', async function(snapshot){
        const data = []
        if(snapshot.val() === null || snapshot.val() === undefined){
            dispatch({ type: 'SET_HOMEGROUP' , value:data})
        }else{
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key],
                    })
            })
            for(let i = 0; i < data.length; i++){
                const uri = await getProfileUri(data[i].id)
                data[i] = {
                    ...data[i],
                    profileImg : uri
                }
            }
            const pg = await getPendingGroup(username)
            if(pg) data.unshift({pendingGroup : true , id:'PendingGroup'})
            await AsyncStorage.setItem('grouplist' , JSON.stringify(data))
            dispatch({type:'SET_HOMEGROUP' , value : data})   
        }
    })
    }
    const getPendingGroup = (username) => {
        const pendingData = database().ref('users/' + username + '/pendingGroup').once('value').then(async function(snapshot){
            const data = []
            if(snapshot.val() === null || snapshot.val() === undefined){
                dispatch({type: 'SET_PENDINGGROUP' , value:data}) 
                return false
            } 
            else{
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key],
                        })
                })
                dispatch({type: 'SET_PENDINGGROUP' , value:data}) 
                return true
            }
        })
        return pendingData
    }
    const _retrieveUsername = async () => {
            try{
                const async_friendlist = await AsyncStorage.getItem('friendlist');
                const groupdata = await AsyncStorage.getItem('grouplist')
                if(async_friendlist !== null){
                    dispatch({type:'SET_HOMEFRIEND',  value: JSON.parse(async_friendlist)});
                    dispatch({type:'SET_ALLHOMEFRIEND',  value: JSON.parse(async_friendlist)});
                    dispatch({type:'SET_HOMEGROUP',  value: JSON.parse(groupdata)});
                }
                
            }catch{
                console.log('no data found!')
            }
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
            //   alert(value)
              const res = await getAllFriend(value)
              await getAllGroup(value)
              
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
        navigation.navigate('ChatWindow' , {groupId : false})
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
    const [friendclick , setfriendclick] = useState(true)
    const [groupclick , setgroupclick] = useState(true)
    const [friendright , setfriendright] = useState(false)
    const [groupright , setgroupright] = useState(true)
    const FriendsProf = async (friend) => {
        const username = await AsyncStorage.getItem('username')
        navigation.navigate('FriendsProfile')
        setModalVisible(false)
    }

    const renderFriend = ({item}) => {
        if(HomeState.friendlist == ''){
            return(
             <View style={{flex:1}}>
             <Text style={{textAlign:'center'}}>You dont have any friend</Text>
             </View>
            )
        }
        return(
            <Friendlist url={item.profileImg} name={item.displayname} funct={()=>{ 
                setModalVisible(true)
                setModalName(item.displayname)
                setModalUri(item.profileImg)
                setModalStatus(item.statusmessage)
                setModalUsername(item.data.friend)
             }} />
        )
    }

    const renderGroup = ({item}) => {
        if(HomeState.grouplist == ''){
            return(
             <View style={{flex:1}}>
             <Text style={{textAlign:'center'}}>You dont have any group</Text>
             </View>
            )
        }
        if(item.pendingGroup){
            return(
                <Friendlist isgroup={true} url={{uri:'https://firebasestorage.googleapis.com/v0/b/triang…=media&token=8e8f6b02-b104-4de1-8d04-d2887c764a6d'}} name={'Group Invitations (' + HomeState.pendinggroup.length + ')' } funct={()=>{
                    navigation.navigate('GroupInfo')
                }}/>
            )
        }
        return(
            <Friendlist isgroup={true} url={item.profileImg} name={item.data.groupName} funct={()=>{
                navigation.navigate('GroupInfo' , {groupId : item.id})
            }}/>
        )
    } 

    return(
        <View style={{flex:1 , position:'relative', backgroundColor:'#FFFFFF'}}>
            <Modal 
            animationType={"fade"}
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => { setModalVisible(false); }}
            >
                <View style={{backgroundColor:'#000000aa' , flex:1, justifyContent:'center'}}>
                    <View style={{backgroundColor:'rgba(255,255,255,0.85)',borderWidth:1,borderRadius:8, marginHorizontal:'10%', marginVertical:'40%' , flex:1}}>
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
                    <View style={{flex:1}}>
                    <TouchableOpacity onPress={()=>{setfriendclick(!friendclick) , setfriendright(!friendright)}} style={[style.homeinfo,{flexDirection : 'row'}]}>
                        {
                            friendright ? (
                                <View style={{position:'absolute' , right:'5%'}}>
                                    <Icon1 name="arrow-right-circle" color={'rgba(27,176,233,1)'} size={25} />
                                </View>
                            ) : (
                                <View style={{position:'absolute' , right:'5%'}}>
                                    <Icon1 name="arrow-down-circle" color={'rgba(27,176,233,1)'} size={25} />
                                </View>
                            )
                        }
                        <View style={{width:35, justifyContent:'center'}}>
                        <Icon name="user" size={20} style={{marginRight:'3%'}}/>
                        </View>
                        <Text style={[style.friendngroup]}>
                        Friends
                        </Text>
                        <Text style={[style.friendngroup]}>
                        ({HomeState.friendlist.length})
                        </Text>
                    </TouchableOpacity> 
                        {
                            friendclick ? (
                                <View style={{height:'auto'}}>
                                <FlatList
                                data={HomeState.friendlist}
                                renderItem = {renderFriend}
                                keyExtractor={item => item.id}
                                />
                                </View>
                            ) : null
                        }
                        
                    <TouchableOpacity onPress={()=>{setgroupclick(!groupclick), setgroupright(!groupright)}} style={[style.homeinfo,{flexDirection : 'row',marginTop:'5%'}]}>
                        {
                            groupright ? (
                                <View style={{position:'absolute' , right:'5%'}}>
                                    <Icon1 name="arrow-right-circle" color={'rgba(27,176,233,1)'} size={25} />
                                </View>
                            ) : (
                                <View style={{position:'absolute' , right:'5%'}}>
                                    <Icon1 name="arrow-down-circle" color={'rgba(27,176,233,1)'} size={25} />
                                </View>
                            )
                        }   
                            <View style={{width:35, justifyContent:'center'}}>
                            <Icon name="users" size={18} style={{marginRight:'3%'}}/>
                            </View>
                            <Text style={[style.friendngroup]}>
                            Groups
                            </Text>
                            <Text style={[style.friendngroup]}>
                            ({HomeState.grouplist.length})
                            </Text>
                    </TouchableOpacity> 
                        {
                            groupclick ? (
                                <View style={{flex:1}}>
                                <FlatList
                                data={HomeState.grouplist}
                                renderItem={renderGroup}
                                keyExtractor={item => item.id}
                                /> 
                                </View>
                            ) : null
                        }
                    </View>        
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
        paddingHorizontal : 20
    },
    friendngroup : {
        fontFamily : 'ITCKRISTEN',
        fontSize : 18,
        marginRight: '2%'
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