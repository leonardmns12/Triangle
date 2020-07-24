import React , { useEffect } from 'react';
import { View , Text, ScrollView, StyleSheet } from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import Friendlist from '../../../Component/Molekuls/Friendlist/';
import { Button } from '../../../Component/';
import { signOutUser } from '../../../Config/Redux/restApi/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddFriend from '../../../../assets/Home/addfriend.svg';
import Magnifier from '../../../../assets/Home/magnifier.svg';
//GAMBAR ADDFRIEND LOKASI BLM BENER


const Home = ({navigation}) => {

    useEffect(()=>{
    })

    const onClickLogout = async () => {
        const res = await signOutUser();
        navigation.replace('Login');
    }

    const gtchat = (screen) => {
        navigation.replace(screen);
    }

    const editProfile = () => {
        alert('edit profile');
    }

    const search = () => {
        alert('search');
    }

    return(
        <View style={{flex:1 , position:'relative'}}>
            <View style={{flex:1, backgroundColor:'rgba(0,94,97,0.5)' , borderBottomLeftRadius:41, borderBottomRightRadius:41, position:'relative'}}>
              <View style={{position:'relative'}}>
                  <View style={[style.addfriend,{width: 40, height: 38}]}>
                      <View style={[,{}]}>
                      <AddFriend onPress={search} width={40} height={38} />
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
                <Friendlist name={"Kenny Ongko"} />
                <Friendlist name={"Kent Anderson"} />
                <Friendlist name={"Nico Fernando"} />
                <Friendlist name={"Nico Fernando"} />
                <Friendlist name={"Nico Fernando"} />
    
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

export default Home;