import React , {useEffect,useState} from 'react';
import { View , Text , TouchableOpacity , StyleSheet , Image} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../../../assets/chatWindow/avatar.svg';
import storage from '@react-native-firebase/storage';

const CallComponent = ({navigation, isSender , message , photo , sender, funct}) => {
    let mounted = true
    useEffect(()=>{
        if(!isSender)getProfileImg()
        return () => {
            mounted = false
        }
    },[])

    const getProfileImg = async () => {
        const url = await storage()
        .ref('images/' + sender)
        .getDownloadURL().catch( e => {
            console.log(e)
            if(mounted)setimg('null')
        })
        if(url !== undefined){
            if(mounted)setimg({uri:url})
        }
}
    const [image , setimg] = useState('null')

    return(
        <View style={[{alignItems:`${isSender ? 'flex-end' : 'flex-start'}`}]}>
            
            <View style={[styles.container,{backgroundColor:`${isSender ? 'rgba(20,146,230,0.8)' : '#F6F6F6'}`,marginLeft:'12%'}]}>
                {
                    !isSender ? (
                        image === 'null' ? (
                          <Avatar height={30} width={30} style={{position:'absolute',left:'-12%'}} />
                          ) : (
                            <Image source={image} style = {{width: 30, height: 30 , borderRadius: 20,position:'absolute',left:'-14%'}}/>
                          )
                    ) : null
                }
                
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{color:`${isSender ? '#FFFFFF' : 'black'}`,marginBottom:'2%', fontSize:14}}>{message}</Text>
                </View>
                    <Icon.Button
                    name={'phone-incoming'}
                    color={`${isSender ? '#FFFFFF' : 'black'}`}
                    title={'Join call'}
                    iconStyle={{color:'green'}}
                    backgroundColor={`${isSender ? '#007AFF' : 'rgba(115,116,118,0.05)'}`}
                    onPress={funct}
                    >Join Call</Icon.Button>
            </View>
        </View>       
    )
}

const styles = StyleSheet.create({
    container : {
        paddingHorizontal:'5%',
        marginVertical:'4%',
        borderRadius:5,
        paddingVertical:'5%'
    },

})

export default CallComponent