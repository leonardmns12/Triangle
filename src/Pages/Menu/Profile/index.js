import React from 'react';
import { View , Text, StyleSheet, ScrollView  , Alert, BackHandler, AsyncStorage, Image} from 'react-native';
import { simpanData } from '../../../Config/Redux/restApi/';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Contents from '../../../Component/Molekuls/Timeline';
import { signOutUser , clearToken } from '../../../Config/Redux/restApi/';
import { useDispatch , useSelector } from 'react-redux';
import Home from '../Home';
import LeftLogo from '../../../../assets/chatWindow/left.svg';

const Profile = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    const HomeState = useSelector(state => state.homeReducer)
    const dispatch = useDispatch();
    const onClickLogout = async () => {
        const username = await AsyncStorage.getItem('username')
        dispatch({type:'SET_ALLFRIEND' , value:[]})
        dispatch({type:'SET_CHATLIST' , value:[]})
        dispatch({type:'SET_HOMEFRIEND',  value: []});
        await AsyncStorage.removeItem('username')
        await AsyncStorage.removeItem('friendlist')
        await AsyncStorage.removeItem('profileuri')
        await AsyncStorage.removeItem('displayname')
        await AsyncStorage.removeItem('statusmsg')
        await clearToken(username)
        const res = await signOutUser();
        Alert.alert(
            'Logout',
            'You need to restart apps to login back',
            [
              {text: 'OK', onPress: () => BackHandler.exitApp()},
            ]
        );
    }

    const EditProf = async () => {
        navigation.navigate('EditProfile')
    }

    return(
        <View style={{flex:1}}>
            <View style={{flex:0.7, backgroundColor:'rgba(27,176,233,1)' , borderBottomLeftRadius:41, borderBottomRightRadius:41, position:'relative'}}>
              <View style={{position:'relative'}}>
                <View style={{flexDirection:'row'}}>
                    {/* <TouchableOpacity style={{paddingLeft:1, paddingTop:11}}> 
                    <LeftLogo height={33} width={33}></LeftLogo>
                    </TouchableOpacity>  */}
                    <Text style={[style.headerText,{}]}>Profile</Text>
                    <TouchableOpacity>
                        <Text style={[style.editprof, {}]} onPress={EditProf}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', marginBottom:7}}>
                    {
                        HomeState.profileuri === 'null' ? (
                            <View style={[style.profileimg ,{}]}></View> ) : (
                            <Image source={HomeState.profileuri} style={{width:50, height:50, borderRadius:100 , marginLeft:12}}/> 
                        )
                    }
                    {/* <View style={[style.profileimg ,{}]}></View> */}
                    <Text style={[style.profilename, {}]}>{HomeState.displayname}</Text>
                </View>
                <View style={{width:220, marginBottom: 50}}>
                    <Text style={[style.bio , {}]}>{HomeState.statusmessage}</Text>
                </View>
               </View>
               <TouchableOpacity onPress={onClickLogout} style={{position: 'relative',marginHorizontal:240 ,backgroundColor:'#00C2FF',width:100, height:27, borderRadius:20 , borderColor:'rgb(0,191,166)' }}>
            <Text style={{color:'black', fontSize:15, textAlign:'center', marginTop:3, fontFamily:'ITCKRISTEN'}}>
            Logout
            </Text>
            </TouchableOpacity>
            {/* <Button title="Logout" funct={onClickLogout} /> */}
            </View>
            <View style={{flex:1}}>
            <ScrollView>
            <View> 
                <Contents visible = {'block'} />
                <Contents visible = {'none'} profilename={'Leonard'} commentcount={'2'} time={'17:20'} content={'111'}/>
                <Contents visible = {'block'} profilename={'Leonard'} commentcount={'2'} time={'17:20'} content={'12312312312'}/>
            </View>
        </ScrollView>
            </View>
            <View style={{}}>
            {/* <NavigationMenu profile="active" gotoHome={()=>{gtchat('Home')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoChat={()=>{gtchat('Chat')}}     
                ></NavigationMenu> */}
            </View>
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
    headerText: {
        fontSize : 20,
        fontFamily : 'ITCKRISTEN',
        color : '#FFFFFF',
        paddingTop : 15,
        marginLeft: '40%',
    },
    editprof: {
        fontSize: 20,
        fontFamily : 'ITCKRISTEN',
        color : '#FFFFFF',
        position: 'relative',
        marginLeft: '45%',
        marginTop: '7.5%',
    },
})

export default Profile;