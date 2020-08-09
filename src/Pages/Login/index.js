import React , { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage ,
  ImageBackground
} from 'react-native';
import { signInUser, getUsername } from '../../Config/Redux/restApi';
import {Button, Input} from '../../Component';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PassView from 'react-native-vector-icons/Entypo';

const Login = ({navigation}) => {
  const loginReducer = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  
  const onClickLogin = async () => {
    if(loginReducer.email === '' || loginReducer.password === ''){
    
    }else{
      const res = await signInUser(loginReducer.email , loginReducer.password).catch(err => alert(err));
      if(res){
        const username = await getUsername();
          try {
            await AsyncStorage.setItem(
              'username',username
            );
          } catch (error) {
            // Error saving data
          }
        navigation.replace('Home');
      }
      dispatch({type:'CLEAR_PASSWORD'})
    }
  }
  const onClickRegister = () => {
    navigation.navigate('Register');
  }
  const onChangeInput = (e , type) => {
    dispatch({type:'SET_LOGIN', inputType: type , inputValue: e})
  }
  const [pwdeye , setpwdeye] = useState(true)
  const changepwdeye = () => {
    if(pwdeye === true) setpwdeye(false)
    else setpwdeye(true)
  }
  return(
    <ImageBackground source={require('../../../assets/login.png')} style={{flex:1, }}>
    <View style={{flex:1 , flexDirection: 'column'}}>
      <View style={{flex:1, justifyContent:'center'}}>
        <View style={{paddingTop:43, marginHorizontal:45,marginBottom:'5%', position: 'relative'}}>
            <View style={{flexDirection:'row'}}>
            <Icon name="email" style={{padding:10}} color={'black'} size={24} />
            <Input placeholderTextColor="#1BB0DF" value={loginReducer.email}   onchange={(e)=>{onChangeInput(e,"email")}} title="Email . . ."></Input>
            </View>
            <View style={{flexDirection:'row'}}>
            <Icon name="lock" style={{padding:10}} color={'black'} size={24} />
            <Input  placeholderTextColor="#1BB0DF" title="Password . . ." value={loginReducer.password} pwd={pwdeye} onchange={(e) => {onChangeInput(e,"password")}}></Input>
            <TouchableOpacity onPress={changepwdeye}>
              {
                pwdeye === true ? (
                  <PassView style={{padding:10}} name="eye-with-line" size={20} color="#1BB0DF"/>
                ) : (
                  <PassView style={{padding:10}} name="eye" size={20} color="#1BB0DF"/>
                )
              }
            
            </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center", alignItems:"center"}}>
          <Button title="LOGIN" funct={onClickLogin}/>
          <TouchableOpacity onPress={onClickRegister}>
          <Text style={[styles.baseText,{}]}>
          Belum terhubung ke triangle?
          </Text>
          <Text style={[{color:'#1BB0DF',fontFamily:'ITCKRISTEN',fontSize:12}]}>Buat account sekarang </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ImageBackground>
  )
}
    
const styles = StyleSheet.create({
    input: {
      borderBottomWidth:1, 
      borderColor: '#BBBBBB',
      fontSize:18,
      color : '#1BB0DF',
      fontFamily : 'calibri'
    },
    baseText: {
      fontFamily: 'ITCKRISTEN',
      fontSize:12,
      marginTop: 8,
      color: '#1BB0DF',
    },
  
    headerText: {
      fontFamily: 'ITCKRISTEN',
      fontSize: 17,
      color: '#00BFA6'
    }
  });

  export default Login