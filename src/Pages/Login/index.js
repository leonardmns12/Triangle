import React , { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { signInUser } from '../../Config/Redux/restApi';
import {Button} from '../../Component';
import { useSelector, useDispatch } from 'react-redux';

const Login = ({navigation}) => {
  const loginReducer = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  const onClickLogin = async () => {
    const res = await signInUser(loginReducer.email , loginReducer.password).catch(err => alert(err));
    if(res){
      navigation.navigate('Home');
    }
    dispatch({type:'CLEAR_PASSWORD'})
  }
  const onClickRegister = () => {
    navigation.navigate('Register');
  }
  const onChangeInput = (e , type) => {
    dispatch({type:'SET_LOGIN', inputType: type , inputValue: e})
  }
  return(
    <ScrollView showsVerticalScrollIndicator={false} style={{flex:1 , flexDirection: 'column'}}>
      <View style={{backgroundColor: 'white' , height:300, paddingTop:20, position:'relative'}}>
        <Image source={require('../../../assets/login.png')} style={{width:'100%', height: '100%'}} />
        <Text style={[styles.headerText,{position: 'absolute', top:40, left:130}]}>TriangLe</Text>
      </View>
      <View style={{ height:320}}>
        <View style={{paddingTop:43, marginHorizontal:45,height:200, position: 'relative'}}>
            <TextInput style={[styles.input,{marginBottom:20}]} value={loginReducer.email} onChangeText={(e)=>{onChangeInput(e,"email")}} placeholder="Email . . ."></TextInput>
            <View style={{position:'absolute', top: 58, left: 5}}>
            <Image source={require('../../../assets/mail.png')} style={{height:20 , width:20}} />
            </View>
            <TextInput style={[styles.input,{}]} placeholder="Password . . ." value={loginReducer.password} secureTextEntry={true} onChangeText={(e) => {onChangeInput(e,"password")}}></TextInput>
            <View style={{position:'absolute', top: 125, left: 3}}>
            <Image source={require('../../../assets/lock.png')} style={{width:23 , height:23}}/>
            </View>
        </View>
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
          <Button title="LOGIN" funct={onClickLogin}/>
          <TouchableOpacity onPress={onClickRegister}>
          <Text style={[styles.baseText,{}]}>
          Belum terhubung ke triangle?
          </Text>
          <Text style={[{color:'#00BFA6',fontFamily:'ITCKRISTEN',fontSize:12}]}>Buat account sekarang -></Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
    
const styles = StyleSheet.create({
    input: {
      width:285,
      borderBottomWidth:1, 
      borderColor: '#BBBBBB',
      paddingLeft:32,
      fontSize:20
    },
  
    baseText: {
      fontFamily: 'ITCKRISTEN',
      fontSize:12,
      marginTop: 8,
      color: '#00BFA6',
    },
  
    headerText: {
      fontFamily: 'ITCKRISTEN',
      fontSize: 17,
      color: '#00BFA6'
    }
  });

  export default Login