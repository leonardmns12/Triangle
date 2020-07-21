import React , {useEffect} from 'react';
import { View , Text } from 'react-native';
import io from 'socket.io-client';
import { StyleSheet } from 'react-native';
import { onAuthUser } from '../../Config/Redux/restApi/';
import { useDispatch , useSelector } from 'react-redux';
 
const Splash = ({navigation}) => {
    useEffect(() => {
        // const socket = io('http://192.168.0.131:3000');
        setTimeout( () => {
        },2000) ;  
        checkAuth();
    });
    const checkAuth = async () => {
        const res = await onAuthUser();
        if(res){
            dispatch({type:'SET_USERID' , value: res.uid})
            navigation.replace('ChatWindow');
        }else{
            navigation.replace('Login');
        }
    }
    const loginState = useSelector(state => state.loginReducer)
    const chatState = useSelector(state => state.chatReducer)
    const dispatch = useDispatch();
    return(
        <View style={{backgroundColor:'#00BFA6', flex:1
        ,alignItems:'center', justifyContent:'center'}}>
            <Text style={[styles.text,{}]}>TriangLe</Text>
        </View>
    );
};
const styles = StyleSheet.create({

    text: {
        color: 'white',
        fontFamily: 'ITCKRISTEN',
        fontSize:50,
    },
});

export default Splash;