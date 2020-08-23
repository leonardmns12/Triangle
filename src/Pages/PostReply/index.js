import React from 'react';
import {View , Text , StyleSheet , TouchableOpacity , ScrollView } from 'react-native'
import PostComment from '../../Component/Molekuls/PostReplyComment/';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import OptionIcon from 'react-native-vector-icons/SimpleLineIcons'
import BackIcon from 'react-native-vector-icons/Ionicons'
const PostReply = () => {
    return(
        <View style={{backgroundColor:'white', flex:1}}>
            <View style={[styles.header,{}]}>
                <BackIcon name="chevron-back-circle-outline" size={40} color="white" style={{padding:8, paddingRight:0}}/>
                <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute' , right:'3%', top:'8%'}}>
                </TouchableOpacity>
                <Text style={[styles.headerText,{}]}>Timeline</Text>
            </View>
            <View style={{marginTop:"2%", backgroundColor:"white"}}>
                <View style={{flexDirection:'row', paddingLeft:10}}>
                    <View style={[styles.profilePict]}></View>
                    <Text style={[styles.profileName]}>Leonard Monosa</Text>
                    <View style={{position:'absolute', right:0, padding:"0%" , flexDirection:'row', marginLeft:"2%"}}>
                        <TouchableOpacity>
                            <OptionIcon name="options-vertical" size={22} style={{padding:0, paddingTop:4}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{marginTop:"3%", marginBottom: "0%", padding:"8%", backgroundColor:"#E9EBEE"}}>Some friend being wise by adding more friend</Text>
                </View>
                <View style={{flexDirection:'row' , borderBottomWidth:1, padding:10, borderBottomColor:"black"}}>
                    <Text style={{fontFamily:'ITCKRISTEN', color:"grey"}}>19:00</Text>
                    <View style={{position:'absolute', right:0, padding:10 , flexDirection:'row'}}>
                    <Icon name="comment-text-multiple-outline" size={20} color="#1BB0DF" />
                    <Text style={{marginLeft:5, color:"grey"}}>102</Text>
                    </View>
                </View>
                <View style={{padding:"3%", flexDirection:"row", }}>
                    <TouchableOpacity>
                        <Text style={{}}>Load more comments</Text>
                    </TouchableOpacity>
                    <Text style={{marginLeft:"3%", padding:"1%", fontSize:10, color:"grey"}}>96 more</Text>
                </View>
            </View>
            
            <ScrollView style={{backgroundColor:'white', padding:10}}>
                <PostComment name="Kent anderson" content="mantap" time="19.00"/>   
                <PostComment name="Nico Fernando" content="gile" time="19.00"/>   
                <PostComment name="Kent anderson" content="mantap" time="19.00"/>   
                <PostComment name="Nico Fernando" content="gile" time="19.00"/>   
                <PostComment name="Kent anderson" content="mantap" time="19.00"/> 
                <PostComment name="Kent anderson" content="mantap" time="19.00"/> 
            </ScrollView>
            <View style={{flexDirection:'row' , backgroundColor:'transparent', padding:0, margin:0 , height:'auto'}}>
                <TextInput placeholder="Reply here" style={[styles.inputComment]}/>
                <TouchableOpacity>
                    <Icon name="send-circle" size={38} color="#1BB0DF" style={{paddingTop:10}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles =  StyleSheet.create({
    header : {
        height : 57,
        backgroundColor : '#1BB0DF',
        flexDirection : 'row'
    },
    headerText : {
        fontSize : 20,
        fontFamily : 'ITCKRISTEN',
        color : '#FFFFFF',
        paddingTop : 15,
        marginLeft: 0
    },
    timelinetext : {
        fontSize : 18,
        marginHorizontal : 18,
        marginVertical : 15
    },
    profilePict : {
        height:30 , 
        width:30 , 
        borderRadius:30, 
        borderWidth:1
    }, 
    profileName : {
        marginLeft:10, 
        justifyContent:'center' , 
        alignItems:'center', 
        paddingTop:5, fontWeight:"bold", 
        fontSize:16,
    }, 
    inputComment : {
        backgroundColor:"white", 
        width:'80%', 
        borderRadius:25, 
        padding:10,  
        height:35, 
        margin:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,

        
    }
})

export default PostReply