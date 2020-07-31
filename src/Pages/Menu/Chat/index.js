import React , { useEffect } from 'react';
import { View , Text , StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import LeftLogo from '../../../../assets/chatWindow/left.svg';
import Addfriend from '../../../../assets/Home/addfriend.svg';
import Magnifier from '../../../../assets/Home/magnifier.svg';
import { TextInput } from 'react-native-gesture-handler';
import Friendchat from '../../../Component/Molekuls/Friendchat/';
const Chat = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }

    const gotoFindUser = () => {
        navigation.navigate('FindFriend');
    }

    return(
        <View style={{flex:1}}>
            <View style={[styles.header,{}]}>
                <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                <LeftLogo height={33} width={33}></LeftLogo>
                </TouchableOpacity>
                <TouchableOpacity onPress={gotoFindUser} style={{position:'absolute' , right:'3%', top:'8%'}}>
                <Addfriend height={40} width={38}></Addfriend>
                </TouchableOpacity>
                <Text style={[styles.headerText,{}]}>Chat</Text>
            </View>
                <View style={{ backgroundColor:'white'}}>
                <View style={{position:'absolute', marginVertical:20, marginLeft: 25}}>
                <Magnifier height={23} width={23} />
                </View>
                <TextInput placeholder="Search Friends" style={[styles.input ,{}]}></TextInput>
                </View>
            <ScrollView style={{flex: 1, backgroundColor:'#FFFFFF'}}>
                <Friendchat name={"Leonard"} timestamp={"19:00"} textmsg={"Some Peoples."} />
                <Friendchat name={"Bukan lele"} timestamp={"19:00"} textmsg={"Some Peoples."} />
                <Friendchat name={"Masih lele"} timestamp={"19:00"} textmsg={"Some Peoples."} />
                <Friendchat name={"Tetap lele"} timestamp={"19:00"} textmsg={"Some Peoples."} />
                <Friendchat name={"Selamanya lele"} timestamp={"19:00"} textmsg={"Some Peoples."} />
                <Friendchat name={"ini dummy"} timestamp={"19:00"} textmsg={"Some Peoples."} />
                <Friendchat name={"ini juga"} timestamp={"19:00"} textmsg={"Some Peoples."} />
                <Friendchat name={"yang ini bukan"} timestamp={"19:00"} textmsg={"Some Peoples."} />
                <Friendchat name={"bukan salah lagi"} timestamp={"19:00"} textmsg={"Some Peoples."} />
            </ScrollView>
            <View style={{}}>
            <NavigationMenu chat="active" gotoHome={()=>{gtchat('Home')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoProfile={()=>{gtchat('Profile')}}     
                ></NavigationMenu>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header : {
        height : 57,
        backgroundColor : '#00BFA6',
        flexDirection : 'row'
    },
    headerText : {
        fontSize : 20,
        fontFamily : 'ITCKRISTEN',
        color : '#FFFFFF',
        paddingTop : 15,
        marginLeft: 20
    },
    input : {
        borderWidth : 1,
        borderColor : '#707070',
        height:40,
        width:340,
        marginHorizontal: 10,
        borderRadius : 17,
        marginVertical : 13,
        paddingLeft : 50,
        fontFamily : 'ITCKRISTEN'
    }
})

export default Chat;