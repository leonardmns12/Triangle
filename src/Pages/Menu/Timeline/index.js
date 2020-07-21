import React from 'react';
import { View , Text } from 'react-native';

import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';

const Timeline = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    return(
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor:'white'}}>
             <Text>Ini adalah Timeline</Text>
            </View>
            <View style={{}}>
            <NavigationMenu timeline="active" gotoHome={()=>{gtchat('Home')}}
                gotoChat={()=>{gtchat('Chat')}}
                gotoProfile={()=>{gtchat('Profile')}}     
                ></NavigationMenu>
            </View>
        </View>
    )
}

export default Timeline;