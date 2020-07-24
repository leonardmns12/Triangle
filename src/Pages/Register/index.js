import React from 'react';

import { View , Text , StyleSheet, Image} from 'react-native';
import {  ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Input } from '../../Component/';
import { createNewUser, createUser, addFriend , updateUser } from '../../Config/Redux/restApi/';
import { useSelector , useDispatch } from 'react-redux';
import { YellowBox } from 'react-native';
import _ from 'lodash';

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
        if(form.password !== form.password_confirm){
            alert('password did not match!');
        }else{
            const res = await createNewUser(form).catch(err => alert(err))
            if(res){
                alert(res);
                const userData = {
                    username : form.username,
                    email : form.email,
                }
                const updateData = {
                    username : form.username
                }
                await createUser(userData);
                await updateUser(updateData);
                dispatch({type:'CLEAR_FORM'});
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

    return(
        <ScrollView>
            <View style={{height:260, alignItems:'center', paddingTop:5}}>
                <Image source={require('../../../assets/register.png')} style={{width:290, height:250}} />
            </View>
            <View style={{height:350,paddingHorizontal:35}}>
                <View style={{}}> 
                    <Input style={[styles.input,{}]} value={form.username} onchange={(e)=>{onChangeInput(e, "username")}} title="Username . . ."/>
                    <Input style={[styles.input,{}]} value={form.email} onchange={(e)=>{onChangeInput(e, "email")}} title="Email . . ."/>
                    <Input style={[styles.input,{}]} value={form.password} onchange={(e)=>{onChangeInput(e, "password")}} pwd={true} title="Password . . ."/>
                    <Input style={[styles.input,{}]} value={form.password_confirm} onchange={(e)=>{onChangeInput(e, "password_confirm")}} pwd={true} title="Password Confirm . . ."/>
                    <View></View>
                    <View></View>
                    <View></View>
                </View>
                <View style={{alignItems:'center', justifyContent:'center', paddingTop:30}}>
                    <Button title="Register" funct={onClickRegister} />
                    <TouchableOpacity onPress={gotoLogin}>
                        <Text style={{marginTop:10, fontFamily:'ITCKRISTEN' , fontSize:12, color:'#00BFA6'}}>Kembali ke halaman login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingLeft:32,
        height:5,
        borderBottomWidth:1,
        borderColor: '#707070',
        marginTop: 22,
    },  
});

export default Register;