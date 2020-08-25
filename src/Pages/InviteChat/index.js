import React, {useState, useEffect} from 'react'
import {View , Text, StyleSheet, FlatList, AsyncStorage} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconSearch from 'react-native-vector-icons/FontAwesome5'
import { useDispatch , useSelector } from 'react-redux';
import GroupMember from '../../Component/Molekuls/GroupMember/'
import { getMemberGroup , getPendingGroup } from '../../Config/Redux/restApi';
import { color } from 'react-native-reanimated'


const InviteChat = () =>{
    useEffect(()=>{
        getGroupMember()
    },[]) 
    const getGroupMember = async () => {
        const res1 = await AsyncStorage.getItem('pending')
        if(res1!==null){
            dispatch({type:'SET_GROUPPENDING' , value:JSON.parse(res1)})
        }
        dispatch({type:'SET_GROUPPENDING' , value:await getPendingGroup(route.params.groupId)})
        const res = await AsyncStorage.getItem('group')
        if(res !== null){
            dispatch({type:'SET_MEMBERGROUP' , value:JSON.parse(res)})  
        }
        dispatch({type:'SET_MEMBERGROUP' , value:await getMemberGroup(route.params.groupId)})
        await AsyncStorage.setItem('group',JSON.stringify(groupState.memberGroup))
    }
    const dispatch = useDispatch()
    const groupState = useSelector(state => state.groupInfoReducer);
    const [isSelected , setSelected] = useState(true);
    const renderItem = ({item}) => {
        return(
            <GroupMember name={item.data.member}/>
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
            <TextInput placeholder={"Search by Display Name"}/>
                <IconSearch name="search" size={22} color="grey" style={{position: "absolute", right:0, padding:5}}/>   
            </View>

            {
                isSelected ? (
                    <FlatList 
                    renderItem={renderItem}
                    data={groupState.memberGroup}
                    key={item => item.id}
                    />
                ) : <FlatList 
                    renderItem={renderItem}
                    data={groupState.pendingGroup}
                    key={item => item.id}
                    />
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
    }

})

export default InviteChat;