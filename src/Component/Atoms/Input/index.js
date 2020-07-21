import React from 'react';

import { TextInput, StyleSheet } from 'react-native';

const Input = ({title , pwd , onchange, value}) => {
    return(
        <TextInput style={[styles.input,{}]} placeholder={title} value={value} secureTextEntry={pwd} onChangeText={onchange}>
            
        </TextInput>
    );
};

const styles = StyleSheet.create({
    input: {
        paddingLeft:32,
        height:37,
        borderBottomWidth:1,
        borderColor: '#707070',
        marginTop: 22,
    },  


});

export default Input;