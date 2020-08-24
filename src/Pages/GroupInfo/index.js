import React, {useState} from 'react'
import { View , Text, StyleSheet, TouchableOpacity, ScrollView, Modal} from 'react-native'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconSearch from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-gesture-handler';
import GroupMember from '../../Component/Molekuls/GroupMember/'
const GroupInfo = () => {
    const [ModalOpen, SetModalOpen] = useState(false); 
    const [ModalRename, SetModalRename] = useState(false); 
    return(
        <View style={{backgroundColor:'white', flex:1}}>
            <View style={[styles.profile, {}]}>
                <View style={[styles.GroupPict]}></View>
                <Modal visible={ModalRename} animationType="slide" transparent={true}>
                    <View style={[styles.container]}>
                        <Text style={{fontWeight:"bold", padding:50}}>Rename</Text>
                        <View style={[styles.modalRename]}>
                            <TextInput placeholder="Group 1"/>
                        </View>
                        <View style={{flexDirection:'row' , padding:0, marginTop:50, height:'auto', borderTopWidth:1}}>
                            <TouchableOpacity style={[styles.modalOption, {borderRightWidth:1}]}>
                                <Text style={{fontWeight:"bold", textAlign: "center", color:"#1BB0DF"}} onPress={() => SetModalRename(false)}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalOption, {}]}>
                                <Text style={{fontWeight:"bold", textAlign: "center", color:"#1BB0DF"}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Text style={[styles.GroupName]} onPress={() => SetModalRename(true)}>Group 1</Text>
                <View style={{position:'absolute', right:0, padding:25, flexDirection:"row", flex:1}}>
                    <IconIon name="image-outline" size={30}/>
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
                <TouchableOpacity style={[styles.Info, {}]}>
                    <Text style={{fontWeight:"bold", textAlign: "center",}}>Member (10)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Info, {}]}>
                    <Text style={{fontWeight:"bold", textAlign: "center",}}>Pending (100)</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.Search]}>
                <TextInput placeholder="Search By Display Name" style={{color:"black"}}></TextInput>
                <IconSearch name="search" size={22} color="grey" style={{position: "absolute", right:0, padding:5}}/>   
            </View>
            <ScrollView style={{}}>
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
            </ScrollView>

            
            <View style={{flexDirection:'row' , padding:5, margin:0 , height:'auto'}}>
                <TouchableOpacity style={[styles.Footer, {backgroundColor:"#30D5C8"}]}>
                    <Text style={{fontWeight:"bold", textAlign: "center",}}>Invite to chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Footer, {backgroundColor:"white"}]}>
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
        padding:10,  
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
        alignItems:"center", 
        width: "70%", 
        height: "30%",
        marginLeft:"15%", 
        marginTop:"60%",
        flex:0
    }, 

    modalOption : {
        width:"50%", 
        backgroundColor:"white", 
        padding:10, 
        color:"#1BB0DF"
    }, 

    modalRename : {
        backgroundColor:"white", 
        width:'90%', 
        borderRadius:10,
        padding:10,  
        height:40, 
        margin:"2%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    }, 

})

export default GroupInfo;