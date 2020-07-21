import React from 'react';
import { View, Text } from 'react-native';

import HomeLogoActive from '../../../../assets/navigation/home-active.svg';
import HomeLogo from '../../../../assets/navigation/home.svg';
import ChatLogo from '../../../../assets/navigation/comment.svg'
import ChatLogoActive from '../../../../assets/navigation/comment-active.svg'
import TimelineLogo from '../../../../assets/navigation/clock.svg';
import TimelineLogoActive from '../../../../assets/navigation/clock-active.svg';
import AccountLogo from '../../../../assets/navigation/profile.svg';
import AccountLogoActive from '../../../../assets/navigation/profile-active.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
const NavigationMenu = ({navigation, gotoHome , gotoChat, gotoTimeline, gotoProfile, home , chat, timeline, profile}) => {

    const homeLogo = (screen) => {
        if(screen === "active"){
            return <HomeLogoActive width={25} height={25}/> ;
        }else{        
            return <HomeLogo width={25} height={25}/> ;
        }  
    }

    const chatLogo = (screen) => {
        if(chat === "active"){
            return <ChatLogoActive fill="white" width={25} height={25}/>  ;
        }else{        
            return <ChatLogo fill="white" width={25} height={25}/>  ;
        }  
    }

    const timelineLogo = (screen) => {
        if(screen === "active"){
            return <TimelineLogoActive width={25} height={25}/> ;
        }else{        
            return <TimelineLogo width={25} height={25}/> ;
        }  
    }

    const profileLogo = (screen) => {
        if(screen === "active"){
            return <AccountLogoActive width={25} height={25}/> ;
        }else{        
            return <AccountLogo width={25} height={25}/> ;
        }  
    }

    return(
        <View style={{height:60, backgroundColor:'#F6F6F6', flexDirection:'row'}}>
            <View style={{flex:1, backgroundColor:'#F6F6F6',justifyContent:'center'}}>
                <TouchableOpacity onPress={gotoHome}>
                <View style={{alignItems:'center'}}>
                    {
                        homeLogo(home)
                    }
                </View>
                </TouchableOpacity>
            </View>
            <View style={{flex:1, backgroundColor:'#F6F6F6',justifyContent:'center'}}>
                <TouchableOpacity onPress={gotoChat}>
                <View style={{alignItems:'center'}}>
                    {
                        chatLogo(chat)
                    }
                </View>
                </TouchableOpacity>
            </View>
            <View style={{flex:1, backgroundColor:'#F6F6F6',justifyContent:'center'}}>
                <TouchableOpacity onPress={gotoTimeline}>
                <View style={{alignItems:'center'}}>
                    {
                        timelineLogo(timeline)
                    } 
                </View>
                </TouchableOpacity>
            </View>
            <View style={{flex:1, backgroundColor:'#F6F6F6',justifyContent:'center'}}>
                <TouchableOpacity onPress={gotoProfile}>
                <View style={{alignItems:'center'}}>
                    {
                        profileLogo(profile)
                    }
                </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NavigationMenu;