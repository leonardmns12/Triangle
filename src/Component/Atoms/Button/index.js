import React , { Component } from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Button = ({title , funct}) => {
    return(
        <TouchableOpacity onPress={funct} style={{ width:206,height:40,backgroundColor:'#00BFA6', justifyContent:"center",borderRadius:20,borderWidth:2,borderColor: '#BBBBBB'}}>
        <Text style={{textAlign:"center",fontSize:20,color:"white"}}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;