import React , { useEffect, Fragment } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Avatar from '../../../../assets/chatWindow/avatar.svg';
const Sender = ({navigation, chatMessage , timestamp}) => {
    return(
    <Fragment>
        <View style={{flexDirection:'row', marginTop:10}}>
                    <Avatar height={30} width={30} />
                    <View style={[styles.chatText,{position:'relative'}]}>
                    <Text>{chatMessage}</Text>
                    </View>       
         </View>
         <Text style={{marginLeft:45,color:'black', fontSize:12}}>{timestamp}</Text>
    </Fragment>
    )
}

const styles = StyleSheet.create({
    chatText : {
        marginLeft:10,
        borderRadius:18,
        paddingHorizontal: 15,
        maxWidth: 200,
        fontSize: 16,
        backgroundColor: '#00BFA6',
        color : 'black',
        paddingTop: 3,
        paddingBottom:3
    }
})

export default Sender;