import React from 'react';
import { View , Text } from 'react-native';
import { simpanData } from '../../../Config/Redux/restApi/';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Profile = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }

    const klikme = () => {
        const data = {
            userId : 'kent anderson',
            name : 'kent23',
            email : 'kent23@gmail.com'
        }

    }

    return(
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor:'white'}}>
            <Text>Ini adalah Profile</Text>
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