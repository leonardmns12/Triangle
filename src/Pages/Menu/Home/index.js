import React , { useEffect, useState , Suspense } from 'react';
import { View , Text, ScrollView, StyleSheet, AsyncStorage , ActivityIndicator, BackHandler } from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import Friendlist from '../../../Component/Molekuls/Friendlist/';
import { Button } from '../../../Component/';
import { signOutUser , getUsername , checkPermission, getDisplayName } from '../../../Config/Redux/restApi/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddFriend from '../../../../assets/Home/addfriend.svg';
import Magnifier from '../../../../assets/Home/magnifier.svg';
import database from '@react-native-firebase/database';
import { useSelector , useDispatch } from 'react-redux';
import storage from '@react-native-firebase/storage';

const Home = ({navigation}) => {
    useEffect(()=>{
        ShowProfile();
        checkPermission()
        BackHandler.addEventListener('hardwareBackPress', cleardispatch);
        _retrieveUsername();
        // cleardispatch()
        
    },[])
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
                const uri = await getProfileUri(data[i].data)
                const displayname = await getDisplayName(data[i].data.friend , 'displayname')
                data[i] = {
                    ...data[i],
                    profileImg : uri,
                    displayname : displayname
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
              
            // alert(value);
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
        dispatch({type: 'SET_RECEIVER' , value:friend})
        dispatch({type: 'SET_SENDER' , value:username})
        navigation.navigate('ChatWindow')
    }
    const getProfileUri = async (friend) => {
        const img = await storage()
        .ref('images/' + friend.friend)
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
    return(
        <View style={{flex:1 , position:'relative'}}>
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
                                   
                                   <Friendlist url={id.profileImg} key={key} name={id.displayname} funct={()=>{gotochatroom(id.data.friend)}} />
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