import React , { useEffect, useState } from 'react';
import { View , Text, ScrollView, StyleSheet, AsyncStorage , ActivityIndicator, BackHandler } from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import Friendlist from '../../../Component/Molekuls/Friendlist/';
import { Button } from '../../../Component/';
import { signOutUser , getUsername , checkPermission } from '../../../Config/Redux/restApi/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddFriend from '../../../../assets/Home/addfriend.svg';
import Magnifier from '../../../../assets/Home/magnifier.svg';
import database from '@react-native-firebase/database';
import { useSelector , useDispatch } from 'react-redux';

const Home = ({navigation}) => {
    useEffect(()=>{
        checkPermission()
        BackHandler.addEventListener('hardwareBackPress', cleardispatch);
        _retrieveUsername();
        cleardispatch()
        
    },[])
    const cleardispatch = () => {
        const data = []
        dispatch({type:'SET_LISTMSG' , value:data})
    }
    const HomeState = useSelector(state => state.homeReducer)
    const dispatch = useDispatch()
    const getAllFriend = (username) => { 
    const dataFriend = database().ref('users/' + username + '/friend');
    dataFriend.on('value', function(snapshot){
      const data = []
      if(snapshot.val() === null || snapshot.val() === undefined){
        
      }else{
          Object.keys(snapshot.val()).map(key => {
            data.push({
                id: key,
                data: snapshot.val()[key]
                })
            })
            // console.log(data)
            dispatch({type:'SET_HOMEFRIEND',  value: data});
        }
    })
    }
    const _retrieveUsername = async () => {
      
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
            //   alert(value)
              setUsername(value)
              const res = await getAllFriend(value)
              if(res){
                  console.log('data null')
              }
              console.log(HomeState.friendlist)
            // alert(value);
            }
      };
    const onClickLogout = async () => {
        const res = await signOutUser();
        navigation.replace('Login');
    }
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    const editProfile = async () => {
        
    }
    const search = () => {
        alert('search');
    }
    const addfriend = () => {
        navigation.navigate('FindFriend');
    }
    const gotochatroom = async (friend) => {
        
        dispatch({type: 'SET_RECEIVER' , value:friend})
        dispatch({type: 'SET_SENDER' , value:username})
        navigation.navigate('ChatWindow')
    }
    const [loading , setLoading] = useState(false);
    const [username , setUsername] = useState('');
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
                    <Text style={[style.profilename, {}]}>Leonard Monosa</Text>
                </View>
                <View style={{width:220, marginBottom: 50}}>
                    <Text style={[style.bio , {}]}>Some people being wise by adding more friends.</Text>
                </View>
               </View>
            <TouchableOpacity onPress={editProfile} style={{backgroundColor:'rgb(0,191,166)',width:339, height:27, marginHorizontal:10, borderWidth:1 , borderColor:'#707070'}}>
            <Text style={{color:'white', fontSize:13, textAlign:'center', marginTop:3}}>
            Edit Profile
            </Text>
            </TouchableOpacity>
            <Button title="Logout" funct={onClickLogout} />
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
               <ActivityIndicator animating={loading} />
               </View>
                {
                    HomeState.friendlist.map((id,key) => {
                        return(
                    
                            <Friendlist key={key} name={id.data.friend} funct={()=>{gotochatroom(id.data.friend)}} />
                        )
                    }) 
                }
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