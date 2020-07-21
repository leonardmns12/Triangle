import React , { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import PaperPlaneLogo from '../../../assets/chatWindow/paper-plane.svg';
import ImagesLogo from '../../../assets/chatWindow/photos.svg';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import { Sender, Receiver } from '../../Component';
import { useDispatch, useSelector } from 'react-redux';
import { onChange } from 'react-native-reanimated';
import { sendMessage , getMessage } from '../../Config/Redux/restApi/';
const ChatWindow = ({navigation}) => {
    const chatState = useSelector(state => state.chatReducer);
    const dispatch = useDispatch();
    const onChangeInput = (e , type) => {
        dispatch({type:'SET_MESSAGE', inputType: type, inputValue: e});
    }
    const sendMessages = async () => {
        dispatch({type:'SET_MESSAGE', inputType: 'sender', inputValue: 'leo'});
        dispatch({type:'SET_MESSAGE', inputType: 'receiver', inputValue: 'abel'});
        if( chatState.form.message.length > 0){
            await sendMessage(chatState.form,chatState.userId);
        }
        await getMessage(chatState.userId);
        
    }
    const onClickBack = () => {
        navigation.replace('Chat');
    }

    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            <View style={[styles.chatHeader,{}]}>
                <TouchableOpacity onPress={onClickBack}>
                    <LeftLogo width={33} height={33} />
                </TouchableOpacity>
                <Text style={[styles.headerText,{}]}>Leonard M</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1 , backgroundColor:'#FFFFFF', paddingTop: 10, paddingHorizontal:10}}>
            <Sender chatMessage="halo" timestamp="08.00 AM"/>
            <Receiver chatMessage={chatState.form.message} timestamp="08.01 AM"/>

            </ScrollView>
            </View>
            <View style={{backgroundColor:'#FFFFFF', borderTopWidth:0.9 , height:60, alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity style={{marginLeft:15, marginRight:10}}>
                    <ImagesLogo height={25} width={25}/>
                </TouchableOpacity>
                <TextInput onChangeText={(e)=>{onChangeInput(e,'message')}} style={[styles.input,{}]} placeholder="Type here . . ."></TextInput>
                <TouchableOpacity onPress={sendMessages} style={{marginLeft:5}}>
                    <PaperPlaneLogo height={25} width={25}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input : {
        borderWidth:1,
        width: 267,
        height: 36,
        borderRadius: 18,
        fontWeight: 'bold',
        paddingLeft: 27,
        fontSize : 15,
    },
    headerText : {
        fontSize : 20,
        fontFamily : 'ITCKRISTEN',
        color : '#FFFFFF',
        marginLeft : 22
    },
    chatHeader : {
        height:57, 
        backgroundColor:'#00BFA6', 
        alignItems: 'center',
        flexDirection : 'row',
        paddingHorizontal: 20
    }
})

export default ChatWindow;