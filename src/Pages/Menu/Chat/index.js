import React from 'react';
import { View , Text } from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';

const Chat = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    return(
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor:'white'}}>
            <Text>Ini adalah Chat</Text>
            </View>
            <View style={{}}>
            <NavigationMenu chat="active" gotoHome={()=>{gtchat('Home')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoProfile={()=>{gtchat('Profile')}}     
                ></NavigationMenu>
            </View>
        </View>
    )
}

export default Chat;