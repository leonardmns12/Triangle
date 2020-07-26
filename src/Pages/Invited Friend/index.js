import React from 'react';
import { View , Text } from 'react-native';
import { simpanData } from '../../../Config/Redux/restApi/';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Profile = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }

    return(
        
        <View style={[styles.header,{}]}>
            <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
            <LeftLogo height={33} width={33}></LeftLogo>
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoFindUser} style={{position:'absolute' , right:'3%', top:'8%'}}>
            <Addfriend height={40} width={38}></Addfriend>
            </TouchableOpacity>
            <Text style={[styles.headerText,{}]}>Chat</Text>
        </View>
        
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor:'white'}}>
            <Text></Text>
            </View>
            <TouchableOpacity onPress={klikme} style={{width : 100 , height :35 , borderRadius: 20}}>
                <Text>Klik me</Text>
            </TouchableOpacity>
            <View style={{}}>
            <NavigationMenu profile="active" gotoHome={()=>{gtchat('Home')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoChat={()=>{gtchat('Chat')}}     
                ></NavigationMenu>
            </View>
        </View>
    )
}

export default Profile;