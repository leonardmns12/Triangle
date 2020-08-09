import React , {useState}from 'react';
import { View , Text , StyleSheet, Image , ImageBackground } from 'react-native';
import {  ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Input } from '../../Component/';
import { createNewUser, createUser, addFriend , updateUser , setEditProfile , checkusername } from '../../Config/Redux/restApi/';
import { useSelector , useDispatch } from 'react-redux';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PassView from 'react-native-vector-icons/Entypo';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
const Register = ({navigation}) => {
    const {form} = useSelector(state => state.registerReducer);
    const onClickRegister = async () => {
        if(form.username === '' || form.email === '' || form.password === ''){

        }else{
            if(form.username === form.username.toLowerCase()){
                if(form.password !== form.password_confirm){
                    console.log('password did not match!')
                    alert('password did not match!');
                }else{
                    const checkusernames = await checkusername(form.username)
                    if(checkusernames === true){
                        setalertusername(true)
                        alert('username already taken!')
                    }else{
                        const res = await createNewUser(form).catch(err => alert(err))
                        if(res){
                            alert(res);
                            const userData = {
                                username : form.username,
                                email : form.email
                            }
                            const updateData = {
                                username : form.username
                            }
                            await createUser(userData);
                            await updateUser(updateData);
                            await setEditProfile(form.username,form.username,'displayname')
                            await setEditProfile(form.username,'','statusmessage')
                            dispatch({type:'CLEAR_FORM'})
                            setalertusername(false)
                        }  
                    }           
            }
            }else{
                setalertusername(true)
                alert('Username must be in lowercase!')
            }
        }  
    }
    const gotoLogin = () => {
        navigation.navigate('Login');
    }
    const dispatch = useDispatch();
    const onChangeInput = (value, type) => {
        dispatch({type:'SET_FORM', inputType: type, inputValue: value})
    }
    const onChangeInput1 = (value, type) => {
        dispatch({type:'SET_FORM', inputType: type, inputValue: value})
        setalertusername(false)
    }
    const[pwdconfeye , setpwdconfeye] = useState(true);
    const[pwdeye , setpwdeye] = useState(true);
    const[alertusername , setalertusername] = useState(false)
    const changepwdeye = () => {
        if(pwdeye === true){
            setpwdeye(false)
        }else{
            setpwdeye(true)
        }
    }
    const changepwdconfeye = () => {
        if(pwdconfeye === true){
            setpwdconfeye(false)
        }else{
            setpwdconfeye(true)
        }
    }
    return(
        <ImageBackground style={{flex:1}} source={require('../../../assets/register.png')}>
        <View style={{flex:1}}>
            <View style={{}}>
                <Text style={[styles.registerText]}>Hello , We're glad you're here!</Text>
            </View>
            <View style={{flex: 1,paddingHorizontal:35, justifyContent:'center', alignItems:'center'}}>
                <View style={{}}> 
                    <View style={[styles.searchSection]}>
                    <Icon style={styles.searchIcon} name="face-profile" size={20} color="#1BB0DF"/>
                    <Input style={[styles.input,{}]}  value={form.username} onchange={(e)=>{onChangeInput1(e, "username")}} title="Username . . ."/>
                    {
                        alertusername === true ? (
                            <Icon style={styles.searchIcon} name="alert-circle" size={20} color="#dd2c00"/>
                        ) : null
                    } 
                    </View>
                    <View style={[styles.searchSection]}>
                    <Icon style={styles.searchIcon} name="email" size={20} color="#1BB0DF"/>
                    <Input style={[styles.input,{}]}  value={form.email} onchange={(e)=>{onChangeInput(e, "email")}} title="Email . . ."/>
                    </View>
                    <View style={[styles.searchSection]}>
                    <Icon style={styles.searchIcon} name="lock" size={20} color="#1BB0DF"/>
                    <Input style={[styles.input,{}]}  value={form.password} onchange={(e)=>{onChangeInput(e, "password")}} pwd={pwdeye} title="Password . . ."/>
                    <TouchableOpacity onPress={changepwdeye}>
                        {
                          pwdeye === true ? (
                            <PassView style={styles.searchIcon} name="eye-with-line" size={20} color="#1BB0DF"/>
                        ) : (
                            <PassView style={styles.searchIcon} name="eye" size={20} color="#1BB0DF"/>
                        )  
                        }
                    </TouchableOpacity>
                    </View>
                    <View style={[styles.searchSection]}>
                    <Icon style={styles.searchIcon} name="lock" size={20} color="#1BB0DF"/>
                    <Input style={[styles.input,{}]}  value={form.password_confirm} onchange={(e)=>{onChangeInput(e, "password_confirm")}} pwd={pwdconfeye} title="Password Confirm . . ."/>
                    <TouchableOpacity onPress={changepwdconfeye}>
                        {
                            pwdconfeye === true ? (
                                <PassView style={styles.searchIcon} name="eye-with-line" size={20} color="#1BB0DF"/>
                            ) : (
                                <PassView style={styles.searchIcon} name="eye" size={20} color="#1BB0DF"/>
                            )
                        }
                    
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems:'center', justifyContent:'center', marginTop:'5%'}}>
                    <Button title="Register" funct={onClickRegister} />
                    <TouchableOpacity onPress={gotoLogin}>
                        <Text style={{marginTop:10, fontFamily:'ITCKRISTEN' , fontSize:12, color:'#1BB0DF'}}>Kembali ke halaman login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    input: {
        flex:1,
    },  
    searchSection: {
        flexDirection:'row',
        marginBottom: '3%'
    },
    searchIcon : {
        padding:10
    },
    registerText : {
        color : '#FFF',
        fontSize: 20,
        fontFamily : 'Google-Sans',
        textAlign:'right',
        padding: 20,
        right:0,
        position:'absolute',
    }
});

export default Register;