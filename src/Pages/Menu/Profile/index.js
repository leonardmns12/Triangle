import React from 'react';
import { View , Text } from 'react-native';

import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';

const Profile = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    return(
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor:'white'}}>
            <Text>Ini adalah Profile</Text>
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

export default Profile;