import React, {useState, useEffect} from 'react'
import {View , Text, StyleSheet, FlatList, AsyncStorage , Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-gesture-handler'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconSearch from 'react-native-vector-icons/FontAwesome5'
import IconCheck from 'react-native-vector-icons/Fontisto'
import { useDispatch , useSelector } from 'react-redux';
import GroupMember from '../../Component/Molekuls/GroupMember/'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage';


const InviteChat = () =>{

    const getProfilePicture = async (user) => {
        const res = await storage().ref('images/' + user).getDownloadURL().catch(e =>{
            console.log('dia gapunya poto')
            return false
        })

        return res
    }

    const getFriend = (username) => {
        const res = database().ref('users/' + username + '/friend').once('value').then(async function(snapshot){
          const data = []
          if(snapshot.val() === null || snapshot.val() === undefined){
      
          }else{
            Object.keys(snapshot.val()).map(key => {
              data.push({
                  id: key,
                  data: snapshot.val()[key],
                  profileImg : ''
              })
            })
            for(let i = 0; i < data.length; i++){
                data[i] = {
                    ...data[i],
                    profileImg : await getProfilePicture(data[i].data.friend)
                }
            }
          }
          
          return data
        })
        return res
      }


    const dispatch = useDispatch()
    const globalState = useSelector(state => state.inviteChatReducer)
    const [isClick , setClick] = useState(false);
    const [friend , setfriend] = useState([])

    const displayMember = async () => {
        const username = await AsyncStorage.getItem('username')
        const res = await getFriend(username)
        dispatch({type:'SET_FRIENDINVITE' , value:res})
        
    }

    useEffect(()=>{
        displayMember()
        getProfilePicture('wenny')
    },[])

    const renderItem = ({item}) => {
        return(
            <View style={{flexDirection:'row', padding:"5%", borderBottomWidth:1, borderBottomColor:"#D3D3D3"}}>
            <View style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}}></View>
            <Text style={{marginLeft:"5%", marginTop:"3%", fontSize:16}}>{'leonard'}</Text>
            <IconCheck name='checkbox-passive' />

            </View>
        )
    }

    const disini = ({item}) => {
        console.log(item.profileImg)
        return(
            <TouchableOpacity onPress={()=>{setClick(!isClick)}} style={{flexDirection:'row', padding:"5%", borderBottomWidth:1, borderBottomColor:"#D3D3D3"}}>
            {
                !item.profileImg ? (
                    <View style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}}></View>
                ) : (
                    <Image source={{uri:item.profileImg}}  style={{height:30 , width:30 , borderWidth:1, borderRadius: 30, marginTop:"2%"}} />
                )
                
                
            }
            <Text style={{marginLeft:"5%", marginTop:"3%", fontSize:16}}>{item.data.friend}</Text>
            <View style={{marginLeft:"5%", marginTop:"3%", fontSize:16, position:'absolute', right:0,top:'60%'}}></View>
            {isClick ? <IconCheck name='checkbox-active' color={'green'}/> : (
                    <IconCheck name='checkbox-passive' />
                )
            }
            </TouchableOpacity>
            
        )
    }

    return(
        <View>
            <View style={{flexDirection:'row', backgroundColor: '#DCDCDC'}}>
                <View style={[styles.GroupPict]}></View>
                <Text style={[styles.GroupName]}>Group 1</Text>
                
                <View style={{position:'absolute', right:0, padding:25, flexDirection:"row", flex:1}}>        
                    <IconIon name="exit-outline" size={30} style={{marginLeft:10}} onPress={() => SetModalOpen(true)}/> 
                </View>
            </View>
            <View style={{backgroundColor: 'rgba(112,112,112,0.5)',padding:10}}>
                <Text style={{fontWeight: "bold", textAlign: "center", color: "rgba(112,112,112,3)"}}>Add Friends to Chat</Text>
            </View>
            <View style={[styles.Search]}>
            <TextInput onChangeText={(e)=>{searchUser(e)}} placeholder={"Search by Display Name"}/>
                <IconSearch name="search" size={22} color="grey" style={{position: "absolute", right:0, padding:5}}/>   
            </View>
            
           {
               globalState.friendlist === undefined ? null : (
                <FlatList 
                renderItem={disini}
                data={globalState.friendlist}
                key={item => item.id}
                />
               )
           }
            <View style={{flexDirection:'row' , padding:5, margin:0 , height:'auto'}}>
                <TouchableOpacity style={[styles.Footer, {backgroundColor:"white"}]}>
                    <Text style={{fontWeight:"bold", textAlign: "center", color:"black"}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Footer, {backgroundColor:"#30D5C8"}]}>
                    <Text style={{fontWeight:"bold", textAlign: "center", color:"white"}}>Invite</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profile : {
        backgroundColor:"#DCDCDC", 
        flexDirection : "row", 
        height : 80
    }, 
    
    GroupPict : {
        height:50 , 
        width:50 , 
        borderRadius:30, 
        borderWidth:1, 
        margin: 13, 
    },

    GroupName : {
        padding : 28, 
        paddingLeft:0, 
        fontSize:15, 
        fontWeight:"bold"
    }, 

    Info : {
        width:"50%", 
        backgroundColor:"white", 
        borderWidth:1, 
        borderColor:"#D3D3D3", 
        padding:10, 
    }, 

    Search : {
        backgroundColor:"white", 
        width:'94%', 
        borderRadius:10, 
        paddingLeft:10,  
        height:40, 
        margin:"2%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
      
    }, 

    MemberInfo : {
        borderBottomWidth : 1,
        borderBottomColor : "black", 
        padding:10,
    },

    Footer : {
        width:"46%", 
        borderRadius:10, 
        padding:10,  
        height:40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        margin:"19%"
    }, 

    container : {
        borderRadius: 25, 
        backgroundColor: "white", 
        alignItems:"center", 
        width: "70%", 
        height: "auto",
        marginLeft:"15%", 
        marginTop:"60%",
        flex:0,
    },
    borderlist : {
        height : 56,
        borderRadius: 30,
        flexDirection : 'row',
        marginBottom : 6
    },
    profilepicutre : {
        borderWidth : 1,
        borderRadius: 20,
        height : 40,
        width : 40,
        marginLeft : 18,
        justifyContent: 'center',
        alignItems : 'center',
        marginTop : 6
    },
    profilename : {
        fontSize : 18,
        paddingLeft: 10,
        alignItems : 'center',
        marginTop : 14,
        marginLeft : 5,
        fontFamily: 'Google-Sans'
    },
    radiobutton : {
        position : 'absolute',
        right : '3%',
        top:'35%'
        
        
    
    }

})

export default InviteChat;