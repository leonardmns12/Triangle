import React , { useEffect , useState, Fragment } from 'react';
import { View , Text, StyleSheet , Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch , useSelector } from 'react-redux';
import { getDisplayName } from '../../../Config/Redux/restApi';
import storage from '@react-native-firebase/storage';
const ResultFriend = ({navigation, name, onpress ,status , bgcolor}) => {
    const dispatch = useDispatch()
    const resultfriendstate = useSelector(state => state.resultFriendReducer)
    const [names, setname] = useState(name)
    useEffect(()=>{
       getResultFriend(name)
       
       return () => {
        dispatch({type:'SET_RESULTFRIEND' , value:''})
        dispatch({type:'SET_RESULTFRIENDIMG' , value:false}) 
       }
    },[name])
    const getResultFriend = async (e) => {
            console.log('id e= ' + e)
            const data = await getDisplayName(e, 'displayname')
            dispatch({type:'SET_RESULTFRIEND' , value:data})
            const res = await storage().ref('images/' + e)
            .getDownloadURL().catch(e => {
                console.log('gadapoto')
                return false
            })
            if(res !== undefined && res !== false){
            const url = { uri : res }
            
            dispatch({type:'SET_RESULTFRIENDIMG' , value:url}) 
            }else{
            dispatch({type:'SET_RESULTFRIENDIMG' , value:res}) 
            }
            
            console.log(res)
    }
    return(
        <View style={[{alignItems:'center',justifyContent:'center', paddingTop:48}]}>
        {
            resultfriendstate.profileimg !== false ? (
                <Fragment>
                <Image source={resultfriendstate.profileimg} style={[styles.profileImg]}/>
                <Text style={[styles.profileName,{}]}>{resultfriendstate.displayname}</Text>
                </Fragment>
            ) : (
                <Fragment>
                <View style={[styles.profileImg,{}]}></View>
                <Text style={[styles.profileName,{}]}>{resultfriendstate.displayname}</Text>
                </Fragment>
            )
        }
        
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
        borderRadius:10,
        height:32,
        width:130,
        borderWidth:1,
        justifyContent:'center', 
        alignItems:'center',
        borderColor:'#FFFFFF'
    }
})

export default ResultFriend;