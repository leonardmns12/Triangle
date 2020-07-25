import React from 'react';
import { View , Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const ResultFriend = ({navigation, name, onpress ,status , bgcolor}) => {
    return(
        <View style={[{alignItems:'center',justifyContent:'center', paddingTop:48}]}>
        <View style={[styles.profileImg,{}]}></View>
        <Text style={[styles.profileName,{}]}>{name}</Text>
        <TouchableOpacity onPress={onpress} style={{paddingTop:16}}>
            <View style={[styles.addButton,{backgroundColor : bgcolor}]}>
    <Text style={{color:'#FFFFFF'}}>{status}</Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    profileImg : {
        height:130, 
        width:130, 
        borderRadius:100, 
        backgroundColor: '#FFFFFF', 
        borderWidth:1, 
        borderColor:'#707070'
    },
    profileName : {
        paddingTop:15,
        fontSize:18
    },
    addButton : {
        height:32,
        width:130,
        borderWidth:1,
        justifyContent:'center', 
        alignItems:'center',
        borderColor:'#FFFFFF'
    }
})

export default ResultFriend;