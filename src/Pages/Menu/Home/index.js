import React , { useEffect } from 'react';
import { View , Text } from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import { Button } from '../../../Component/';
import { signOutUser } from '../../../Config/Redux/restApi/';

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
    return(
        <View style={{flex:1}}>
            <View style={{flex:1, backgroundColor:'white'}}>
            <Text>Ini adalah Home</Text>
            <Button title="Logout" funct={onClickLogout} />
            </View>
            <View style={{}}>
                <NavigationMenu home="active" gotoChat={()=>{gtchat('Chat')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoProfile={()=>{gtchat('Profile')}}     
                ></NavigationMenu>
            </View>
        </View>
    )
}

export default Home;