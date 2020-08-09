import React from 'react';

import { TextInput, StyleSheet } from 'react-native';

const Input = ({title , pwd , onchange, value}) => {
    return(
        <TextInput style={[styles.input,{}]} placeholderTextColor="#1BB0DF" placeholder={title} value={value} secureTextEntry={pwd} onChangeText={onchange}>
            
        </TextInput>
    );
};

const styles = StyleSheet.create({
    input: {
        height:37,
        borderBottomWidth:1,
        borderColor: '#1BB0DF',
        width:'70%'
    },  


});

export default Input;