import React , {useEffect , useState } from 'react';
import { View , Text , Image , Animated , ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { onAuthUser } from '../../Config/Redux/restApi/';
import { useDispatch , useSelector } from 'react-redux';

 
const Splash = ({navigation}) => {
    useEffect(() => {
        Animated.parallel([
            Animated.spring(logoanime , {
                toValue : 1,
                tension : 10,
                friction : 2,
                duration : 1000,
                useNativeDriver: false
            }).start(),

            Animated.timing(logotext , {
                toValue : 1,
                duration : 7000,
                useNativeDriver: false
            }),
        ]).start(()=>{checkAuth()})
        // const socket = io('http://192.168.0.131:3000');
        
    });
    const [logoanime , setlogoanime] = useState(new Animated.Value(0))
    const [logotext , setlogotext] = useState(new Animated.Value(0))
    const checkAuth = async () => {
        const res = await onAuthUser();
        
        if(res){
            dispatch({type:'SET_USERID' , value: res.uid})
            navigation.replace('Home');
        }else{
            navigation.replace('Login');
        }
    }
    const loginState = useSelector(state => state.loginReducer)
    const chatState = useSelector(state => state.chatReducer)
    const dispatch = useDispatch();
    return(
    <ImageBackground source={require('../../../assets/bgsplash.png')} style={{flex:1}}>
        <View style={{flex:1,
        alignItems:'center', justifyContent:'center'}}>
            <Animated.View style={{
                opacity: logoanime,
                top: logoanime.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                }),
            }}>
                <Image source={require('../../../assets/triangle.png')} style={{width:160, height:160}} />
            </Animated.View>
            <Animated.View style={{opacity: logotext}}>
             <Text style={[styles.text,{}]}>TriangLe</Text>
            </Animated.View>
        </View>
        </ImageBackground>  
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