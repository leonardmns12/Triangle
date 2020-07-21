import React , { Fragment , useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';

const Receiver = ({navigation,chatMessage,timestamp}) => {
    return(
    <Fragment>
        <View style={{ alignItems:'flex-end', marginTop:10}}>
                <Text style={[styles.receiverText,{}]}>{chatMessage}</Text>
                <Text style={{fontSize:12,marginRight:5}}>{timestamp}</Text>
        </View>
        
    </Fragment>
    )
}

const styles = StyleSheet.create({
    receiverText : {
        backgroundColor:'#00BFA6', 
        maxWidth: 200,
        borderRadius:18,
        paddingHorizontal: 15,
        paddingTop: 3,
        paddingBottom: 3,
        minHeight:30
    }
})
export default Receiver;