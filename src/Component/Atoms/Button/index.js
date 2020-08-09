import React , { Component } from 'react';
import {Text , StyleSheet } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';


const Button = ({title , funct}) => {
    return(
        <TouchableOpacity onPress={funct} style={[styles.button]}>
        <Text style={{textAlign:"center",fontSize:20,color:"white", fontFamily:'calibri'}}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button : {
        width:206,
        height:40,
        backgroundColor:'#1BB0DF', 
        justifyContent:"center",
        borderRadius:20,
        borderWidth:1,
        borderColor: '#FFFFFF',
        shadowColor : 'black',
        shadowOpacity: 0.9,
        shadowRadius: 0.8,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        elevation : 8
    }
})

export default Button;