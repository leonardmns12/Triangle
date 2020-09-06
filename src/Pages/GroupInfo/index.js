import React, {useState, useEffect} from 'react'
import { View , Text, StyleSheet, TouchableOpacity, ScrollView, Modal , AsyncStorage, FlatList , Image } from 'react-native'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconSearch from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-gesture-handler';
import GroupMember from '../../Component/Molekuls/GroupMember/'
import { getMemberGroup , getPendingGroup , changeGroupName } from '../../Config/Redux/restApi';
import { useDispatch , useSelector } from 'react-redux';
const GroupInfo = ({route, navigation}) => {
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
    const [ModalOpen, SetModalOpen] = useState(false); 
    const [ModalRename, SetModalRename] = useState(false); 
    const [isSelected , setSelected] = useState(true);
    const [groupName , setGroupName] = useState(route.params.groupName)
    const gotochat = async () => {
        const username = await AsyncStorage.getItem('username')
        dispatch({type: 'SET_SENDER' , value:username})
        dispatch({type: 'SET_RECEIVER' , value:route.params.groupId})
        navigation.navigate('ChatWindow' , {groupId : route.params.groupId})
    }
    const renderItem = ({item}) => {
        return(
            <GroupMember name={item.displayname} profileuri={item.profileuri}/>
        )
    }
    return(
        <View style={{backgroundColor:'white', flex:1}}>
            <View style={[styles.profile, {}]}>
                {
                    route.params.groupUri.uri === 'https://firebasestorage.googleapis.com/v0/b/triang…=media&token=8e8f6b02-b104-4de1-8d04-d2887c764a6d' ? (
                        <View style={[styles.GroupPict]}></View>
                    ) : (
                        <Image source={route.params.groupUri} style={[styles.GroupPict]} />
                    )
                }
                <Modal visible={ModalRename} animationType="slide" transparent={true}>
                    <View style={{flex: 1 , backgroundColor : 'rgba(112,112,112,0.5)', justifyContent:'center', alignItems:'center'}}>
                    <View style={[styles.container]}>
                        <Text style={{fontWeight:"bold" , textAlign:'center',marginTop:'3%'}}>Rename</Text>
                        <View style={{flex:1,marginTop:'4%'}}>
                            <TextInput onChangeText={(e)=>{setGroupName(e)}} maxLength={16} value={groupName} style={[styles.modalRename]} placeholder="Group 1"/>
                        </View>
                        <View style={{flexDirection:'row' , padding:0, borderTopWidth:1, borderBottomLeftRadius:25, borderBottomRightRadius:25}}>
                            <TouchableOpacity style={[styles.modalOption, {borderRightWidth:1,borderBottomLeftRadius:25}]}>
                                <Text style={{fontWeight:"bold", textAlign: "center", color:"#1BB0DF"}} onPress={() => {SetModalRename(false) , setGroupName(route.params.groupName)}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={async()=>{
                                await changeGroupName(route.params.groupId,groupName)
                                SetModalRename(false)
                            }} style={[styles.modalOption, {borderBottomRightRadius:25}]}>
                                <Text style={{fontWeight:"bold", textAlign: "center", color:"#1BB0DF"}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>
                <Text style={[styles.GroupName]} onPress={() => SetModalRename(true)}>{groupName}</Text>
                <View style={{position:'absolute', right:0, padding:25, flexDirection:"row", flex:1}}>
                    <IconIon onPress={()=>{dispatch({type:'SET_GROUPUNAME' , value:'ea'})}} name="image-outline" size={30}/>
                    <Modal visible={ModalOpen} animationType="slide" transparent={true}>
                        <View style={[styles.container]}>
                            <Text style={{fontWeight:"bold", textAlign:"center", padding:50}}>Leave Group</Text>
                            <Text style={{textAlign:"center", paddingBottom:50}}>Are you sure want to leave group ?</Text>
                            <View style={{flexDirection:'row' , padding:0, margin:0 , height:'auto', borderTopWidth:1}}>
                                <TouchableOpacity style={[styles.modalOption, {borderRightWidth:1}]}>
                                    <Text style={{fontWeight:"bold", textAlign: "center", color:"#1BB0DF"}} onPress={() => SetModalOpen(false)}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalOption, {}]}>
                                    <Text style={{fontWeight:"bold", textAlign: "center", color:"#1BB0DF"}}>Leave</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <IconIon name="exit-outline" size={30} style={{marginLeft:10}} onPress={() => SetModalOpen(true)}/> 
                </View>           
            </View>
            <View style={{flexDirection:'row' , padding:0, margin:0 , height:'auto'}}>
                <TouchableOpacity onPress={()=>{setSelected(true)}} style={[styles.Info, {backgroundColor: '#FFFFFF'}]}>
                <Text style={{fontWeight:"bold", textAlign: "center" }}>Member ({groupState.memberGroup.length})</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setSelected(false)}} style={[styles.Info, {}]}>
                    <Text style={{fontWeight:"bold", textAlign: "center",}}>Pending ({groupState.pendingGroup.length})</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.Search]}>
            <TextInput placeholder={"Find friend by username"}/>
                <IconSearch name="search" size={22} color="grey" style={{position: "absolute", right:0, padding:5}}/>   
            </View>
            {/* <ScrollView style={{}}>
                <GroupMember name="Kent Anderson"/>
                <GroupMember name="Leonard"/>
                <GroupMember name="Wenny"/>
                <GroupMember name="Nico"/>
                <GroupMember name="Valencia"/>
                <GroupMember name="Kent Anderson"/>
                <GroupMember name="Leonard"/>
                <GroupMember name="Wenny"/>
                <GroupMember name="Nico"/>
                <GroupMember name="Valencia"/>
            </ScrollView> */}
   
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
                <TouchableOpacity onPress={()=>{navigation.navigate('InviteChat' , {groupId : route.params.groupId})}} style={[styles.Footer, {backgroundColor:"#30D5C8"}]}>
                    <Text style={{fontWeight:"bold", textAlign: "center",}}>Invite to chat</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={gotochat} style={[styles.Footer, {backgroundColor:"white"}]}>
                    <Text style={{fontWeight:"bold", textAlign: "center",}}>Chat</Text>
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
        margin:"2%"
    }, 

    container : {
        borderRadius: 25, 
        backgroundColor: "white", 
        width: "70%", 
        height:150,
    }, 

    modalOption : {
        width:"50%", 
        backgroundColor:"white", 
        padding:10, 
        color:"#1BB0DF"
    }, 

    modalRename : {
        backgroundColor:"white", 
        width:'80%', 
        borderRadius:10,
        height:40, 
        margin:"2%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        padding:10,
        marginHorizontal:20
    }, 

})

export default GroupInfo;