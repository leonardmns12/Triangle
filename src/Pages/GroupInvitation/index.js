import React, { useEffect , useState} from 'react'
import { View , Text , StyleSheet , FlatList, TouchableOpacity , AsyncStorage , Image} from 'react-native'
import { useSelector , useDispatch} from 'react-redux'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import Icon from 'react-native-vector-icons/AntDesign'

const GroupInvitation = ({route, navigation}) =>{

    const getProfilePicture = async (user) => {
        const res = await storage().ref('images/' + user).getDownloadURL().catch(e =>{
            return false
        })

        return res
    }

    const getUserPendingGroup = (username) => {
        const res = database().ref('users/' + username + '/pendingGroup').once('value').then( async function(snapshot){
          const data = []
          
          if(snapshot.val() === null || snapshot.val() === undefined){
            console.log('data kosong')
          }else{
            Object.keys(snapshot.val()).map(key => {
              data.push({
                  id: key,
                  data: snapshot.val()[key],
                  profileImg: ''
              })
            })
            for(let i = 0; i < data.length; i++){
                data[i] = {
                    ...data[i], 
                    profileImg : await getProfilePicture(data[i].data.username)
                }
            }
            console.log(data)
          }
          return data
        })
        return res
    }

    const dispatch = useDispatch()
    const globalState = useSelector(state => state.pendingGroupReducer)

    const getPendingGroup = async () => {
        const username = await AsyncStorage.getItem('username')
        const res = await getUserPendingGroup(username)
        dispatch({type:'SET_PENDINGGROUP' , value:res})
    }

    useEffect(()=>{
        getPendingGroup()    
    },[]) 

    const RenderItem = ({item}) =>{
        return(
            <View style={{paddingLeft:10 , flexDirection:'row'}}> 
                {
                    !item.profileImg ? (
                        <View style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}}></View>
                    ) : (
                        <Image source={{uri:item.profileImg}}  style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}} />
                    )
                }

                <Text style={{marginLeft:"5%", marginTop:"3%", fontSize:16}}>{item.data.group}</Text>
            
                <Icon name='closecircleo' color={'red'} style={{marginHorizontal:"5%", marginTop:"5%"}}/>
                <Icon name='checkcircleo' color={'green'} style={{marginTop:"5%"}}/>
                   
            </View>
        )
    }

    return(
        <View>
            <View style={{backgroundColor:"#DCDCDC" , padding:"6%"}}>
                <Text style={{marginLeft:"23%", fontSize:16}}>Incoming Group Invitation</Text>
            </View>

            {
                globalState.pendingGroupList === undefined ? null : (
                    <FlatList 
                    renderItem={RenderItem}
                    data={globalState.pendingGroupList}
                    key={item => item.id}
                    />
                )
            }

            <View style={{flexDirection:'row' , padding:5, margin:0 , height:'auto'}}>
                <TouchableOpacity style={[styles.Footer, {backgroundColor:"#30D5C8"}]}><Text style={{fontWeight:"bold", textAlign: "center", color:"white"}}>Back</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.Footer, {backgroundColor:"#30D5C8"}]}><Text style={{fontWeight:"bold", textAlign: "center", color:"white"}}>Accept All</Text></TouchableOpacity>
            </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
        Footer : {
            width:"36%", 
            borderRadius:10, 
            padding:10,  
            height:40,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,  
            elevation: 5,
            margin:"7%"
        }
})


export default GroupInvitation;