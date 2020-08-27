import React, {useState, useEffect} from 'react'
import {View , Text, StyleSheet, FlatList, AsyncStorage} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-gesture-handler'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconSearch from 'react-native-vector-icons/FontAwesome5'
import { useDispatch , useSelector } from 'react-redux';
import GroupMember from '../../Component/Molekuls/GroupMember/'
import { getMemberGroup , getPendingGroup } from '../../Config/Redux/restApi';
import Checked from '../../../assets/Home/tick.svg';
import storage from '@react-native-firebase/storage';
import Camera from '../../../assets/editprofile/ar-camera.svg'
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import Icon1 from 'react-native-vector-icons/Fontisto';


const InviteChat = ({navigation}) =>{
    useEffect(()=>{
        getallfriend();
      },[])
        const [image , setimage] = useState('null')
        const [filterFriend , setFilterFriend] = useState([])
        const [friend , setfriend] = useState([])
        const [groupname , setgroupname] = useState('')
        const [loading , setloading] = useState(false)
        const chooseFile = () => {
            var options = {
              title: 'Select Images',
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };
            ImagePicker.showImagePicker(options, response => {
              console.log('Response = ', response);
        
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
              } else {
                let source = response;
                setimage(source)
                console.log(source)
              }
            });
          };
    
          const getallfriend = async () => {
            const username = await AsyncStorage.getItem('username')
            const arr = await GetFriend(username)
            const arr1 = arr.map((item , index) => {
                item.isSelected = false
                console.log(item.data.friend)
                return {...item}
            })
            setfriend(arr1)
            setFilterFriend(arr1)
          }
    
          const getProfileUri = async (friend) => {
            const res = await storage().ref('images/' + friend).getDownloadURL()
            .catch(e => {
              console.log(e)
              return false
            })
            if(res){
              return res
            }else{
              return false
            }
          }
    
          const GetFriend = (username) => {
            const friendData = database().ref('users/' +username + '/friend').once('value').then(async function(snapshot){
              const data = []
              if(snapshot.val() === null || snapshot.val() === undefined){
                console.log('data kosong')
              }else{
                Object.keys(snapshot.val()).map(key => {
                  data.push({
                      id: key,
                      data: snapshot.val()[key],
                      })
                    })    
                    for(let i = 0; i < data.length; i++){
                      const imageuri = await getProfileUri(data[i].data.friend)
                      const displayName = await getDisplayName(data[i].data.friend, "displayname")
                      data[i] = {
                        ...data[i],
                        imageUri : imageuri,
                        displayName : displayName
                      }
                    }
              }
              console.log(data)
              return data
            })
             return friendData
          }
    
          const searchUser = (findtext) => {
            const data = friend.filter(i => {
                const itemData = i.displayName.toUpperCase();
                
                 const textData = findtext.toUpperCase();
                  
                 return itemData.indexOf(textData) > -1;  
            })
            setFilterFriend(data)
        }
    
          const handleSelected = (ind) => {
            const arr = friend.map((item , index) => {
              if(ind === index){
                item.isSelected = !item.isSelected
              }
              return {...item}
          
            })
            setfriend(arr)
            setFilterFriend(arr)
          }
    
          const renderItem = ({item,index} )  => {
            return(
              <TouchableOpacity onPress={() => {handleSelected(index)}}>
              <View style={[style.borderlist,{}]}>
              {
                item.imageUri ? (
                  <Image source={{uri:item.imageUri}} style={[style.profilepicutre]}  />
                ) : (
                  <View style={[style.profilepicutre]}></View>
                )
              }
              <Text style={[style.profilename,{}]}>{item.displayName}</Text>
                <View style = {[style.radiobutton]}>
                  {
                    item.isSelected ? (
                      <Icon1 size={15} name={"checkbox-active"} color={'green'} /> 
                    ) : (
                      <Icon1 size={15} name={"checkbox-passive"} />
                    )
                  }
                  
                </View>
              </View> 
              </TouchableOpacity>
            )
          }

          const createGroup = async () => {
            
            friend.map((item , index) => {
              if(item.isSelected){
                inviteGroupMember(item.data.friend , group)
              }
            })
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

            <FlatList
                        data = {filterFriend}
                        renderItem = {renderItem}
                        keyExtractor = {item => item.id}
                        />
        
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