import React from 'react';
import { View , Text, StyleSheet, ScrollView} from 'react-native';
import { simpanData } from '../../../Config/Redux/restApi/';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Contents from '../../../Component/Molekuls/Timeline';
import { signOutUser , getUsername , checkPermission } from '../../../Config/Redux/restApi/';
import { useDispatch , useSelector } from 'react-redux';
import Home from '../Home';

const Profile = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    const HomeState = useSelector(state => state.homeReducer)
    const dispatch = useDispatch();
    const onClickLogout = async () => {
        
        dispatch({type:'SET_HOMEFRIEND',  value: []});
        const res = await signOutUser();
        navigation.replace('Login');
    }

    return(
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor:'rgba(0,94,97,0.5)' , borderBottomLeftRadius:41, borderBottomRightRadius:41, position:'relative'}}>
              <View style={{position:'relative'}}>
                <View style={{flexDirection:'row', marginTop: 43, marginBottom:7}}>
                    <View style={[style.profileimg ,{}]}></View>
                    <Text style={[style.profilename, {}]}>{HomeState.displayname}</Text>
                </View>
                <View style={{width:220, marginBottom: 50}}>
                    <Text style={[style.bio , {}]}>{HomeState.statusmessage}</Text>
                </View>
               </View>
               <TouchableOpacity onPress={onClickLogout} style={{position: 'relative',marginHorizontal:250, marginVertical:15 ,backgroundColor:'rgb(0,191,166)',width:100, height:27, borderRadius:20 , borderColor:'rgb(0,191,166)' }}>
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
            <NavigationMenu profile="active" gotoHome={()=>{gtchat('Home')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoChat={()=>{gtchat('Chat')}}     
                ></NavigationMenu>
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
    logout: {

    },
})

export default Profile;