import React , { useEffect, useState , Suspense } from 'react';
import { View , Text, ScrollView, StyleSheet, AsyncStorage , ActivityIndicator, BackHandler , Modal , TouchableOpacity , Image } from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import Friendlist from '../../../Component/Molekuls/Friendlist/';
import { Button } from '../../../Component/';
import { signOutUser , getUsername , checkPermission, getDisplayName } from '../../../Config/Redux/restApi/';
import AddFriend from '../../../../assets/Home/addfriend.svg';
import Magnifier from '../../../../assets/Home/magnifier.svg';
import database from '@react-native-firebase/database';
import { useSelector , useDispatch } from 'react-redux';
import storage from '@react-native-firebase/storage';
import LeftLogo from '../../../../assets/chatWindow/left.svg';
import UserLogo from '../../../../assets/popupprofile/user.svg';
import BlockLogo from '../../../../assets/block.svg';
import ChatLogo from '../../../../assets/chat.svg';

const Home = ({navigation}) => {
    useEffect(()=>{
        ShowProfile();
        checkPermission()
        BackHandler.addEventListener('hardwareBackPress', cleardispatch);
        _retrieveUsername();
        // cleardispatch()
        
        return () => {
            unmounting()
        }
    },[])
    const unmounting = async () => {
        const username = await AsyncStorage.getItem('username')
        database().ref('users/' + username + '/friend').off()
    }
    const cleardispatch = () => {
        const data = []
        dispatch({type:'SET_LISTMSG' , value:data})
    }
    const ShowProfile = async () => {
        const username = await AsyncStorage.getItem('username');
        const dn = await getDisplayName(username, 'displayname')
        const sm = await getDisplayName(username , 'statusmessage')
        dispatch({type:'SET_SHOWPROFILE' , tipe:'displayname', value: dn})
        dispatch({type:'SET_SHOWPROFILE' , tipe:'statusmessage', value: sm})
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
        }
    })
    }
    const _retrieveUsername = async () => {
            
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
    const search = () => {
        alert('search');
    }
    const addfriend = () => {
        navigation.navigate('FindFriend');
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
    const gotoProfile = (e) => {
        alert(e)
    }
    const [modalName , setModalName] = useState('')
    const [modalVisible , setModalVisible] = useState(false)
    const [modalUri , setModalUri] = useState({uri : 'https://firebasestorage.googleapis.com/v0/b/triang…=media&token=8e8f6b02-b104-4de1-8d04-d2887c764a6d'})
    const [modalStatus, setModalStatus] = useState('')
    const [modalUsername , setModalUsername] = useState('')
    return(
        <View style={{flex:1 , position:'relative'}}>
            <Modal 
            animationType={"fade"}
            visible={modalVisible}
            transparent={true}
            >
                <View style={{backgroundColor:'#000000aa' , flex:1, justifyContent:'center'}}>
                    <View style={{backgroundColor:'rgba(255,255,255,0.85)',borderWidth:1,borderRadius:8, marginHorizontal:'20%', marginVertical:'30%' , flex:1}}>
                        <View style={{position:'absolute', padding:10, right:0,flex:1}}>
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
                                <TouchableOpacity onPress={()=>{gotoProfile(modalUri.uri)}} style={{backgroundColor:'#F3F3F3', flex:1,height:40, borderColor:'#777777', borderWidth:1, justifyContent:'center', alignItems:'center'}}>
                                    <UserLogo width={18} height={18}/>
                                    <Text style={{fontSize:8}}>Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'#F3F3F3', flex:1, height:40, borderBottomRightRadius:8, borderColor:'#777777', borderWidth:1, justifyContent:'center', alignItems:'center'}}>
                                    <BlockLogo width={18} height={18}/>
                                    <Text style={{fontSize:8}}>Remove Friend</Text>
                                </TouchableOpacity>
                            </View>
                    </View>     
                </View> 
            </Modal>
            <View style={{flex:1, backgroundColor:'rgba(0,94,97,0.5)' , borderBottomLeftRadius:41, borderBottomRightRadius:41, position:'relative'}}>
              <View style={{position:'relative'}}>

                  <View style={[style.addfriend,{width: 40, height: 38}]}>
                      <View style={[,{}]}>
                      <AddFriend onPress={addfriend} width={40} height={38} />
                      </View>
                  </View>
                <View style={{flexDirection:'row', marginTop: 43, marginBottom:7}}>
                    <View style={[style.profileimg ,{}]}></View>
                    <Text style={[style.profilename, {}]}>{HomeState.displayname}</Text>
                </View>
                <View style={{width:220, marginBottom: 50}}>
                    <Text style={[style.bio , {}]}>{HomeState.statusmessage}</Text>
                </View>
               </View>
            <TouchableOpacity onPress={editProfile} style={{backgroundColor:'rgb(0,191,166)',width:339, height:27, marginHorizontal:10, borderWidth:1 , borderColor:'#707070'}}>
            <Text style={{color:'white', fontSize:13, textAlign:'center', marginTop:3}}>
            Edit Profile
            </Text>
            </TouchableOpacity>
            {/* <Button title="Logout" funct={onClickLogout} /> */}
            </View>
            <View style={{flex:1}}>
                <View style={[style.homeinfo,{flexDirection : 'row'}]}>
                    <Text style={[style.friendngroup,{marginRight:145}]}>
                    Friends & Group
                    </Text>
                    <View style={{float:'right'}}>
                        <TouchableOpacity onPress={search}>
                            <Magnifier width={25} height={25}/>
                        </TouchableOpacity>
                    </View>
                </View> 
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{height:22}}></View>

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
                                   setLoading(false)
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
            <NavigationMenu home="active" gotoChat={()=>{gtchat('Chat')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoProfile={()=>{gtchat('Profile')}}     
            ></NavigationMenu>
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
        paddingHorizontal:15
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
        paddingTop : 14,
        paddingHorizontal : 30

    },
    friendngroup : {
        fontFamily : 'ITCKRISTEN',
        fontSize : 18
    }
})
//gasal
export default Home;