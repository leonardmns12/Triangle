import React from 'react'
import { View , Text , TouchableHighlight , StyleSheet , Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const NewTimeline = () => {
    const buttonSize = new Animated.Value(1)
    const navigation = useNavigation()
    const handlePress = () => {
        Animated.sequence([
            Animated.timing(buttonSize , {
                toValue: 0.8,
                duration : 200,
                useNativeDriver : true
            }),
            Animated.timing(buttonSize, {
                toValue: 1,
                useNativeDriver : true
            })
        ]).start(()=>{navigation.navigate('Timeline')});
        
    }
    const sizeStyle = {
        transform: [{scale: buttonSize}]
    }

    return(
        <View style={{position:'absolute' , alignItems: 'center'}}>
            <Animated.View style={[styles.button, sizeStyle]}>
                <TouchableHighlight onPress={handlePress} underlayColor="rgba(27,176,233,1)">
                    <View>
                        <Icon name="plus" size={24} color="#FFF" />
                    </View>
                </TouchableHighlight>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    button : {
        backgroundColor : 'rgba(27,176,233,1)',
        alignItems : 'center',
        justifyContent : 'center',
        width : 50,
        height : 50,
        borderRadius : 36,
        top: -40,
        shadowColor : 'rgba(27,176,233,1)',
        shadowRadius : 5,
        shadowOffset : { height : 10 },
        shadowOpacity : 0.3,
        borderWidth : 3,
        elevation : 3,
        position : 'absolute',
        borderColor : '#FFF'
    }
})

export default NewTimeline;