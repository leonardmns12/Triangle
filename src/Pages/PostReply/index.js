import React from 'react';
import {View , Text , StyleSheet , TouchableOpacity , ScrollView} from 'react-native'
import PostComment from '../../Component/Molekuls/PostReplyComment/';
import { TextInput } from 'react-native-gesture-handler';
const PostReply = () => {
    return(
        <View style={{backgroundColor:'white'}}>
            <View style={[styles.header,{}]}>
                <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute' , right:'3%', top:'8%'}}>
                </TouchableOpacity>
                <Text style={[styles.headerText,{}]}>Timeline</Text>
            </View>
            <View style={{marginTop:10}}>
                <View style={{flexDirection:'row', paddingLeft:10}}>
                    <View style={{height:30 , width:30 , borderRadius:30, borderWidth:1}}></View>
                    <Text style={{marginLeft:10, justifyContent:'center' , alignItems:'center', paddingTop:5, fontWeight:"bold", fontSize:16}}>Leonard Monosa</Text>
                </View>
                <View>
                    <Text style={{padding:"8%"}}>Some friend being wise by adding more friend</Text>
                </View>
                <View style={{flexDirection:'row' , borderBottomWidth:1, padding:10}}>
                    <Text>19:00</Text>
                    <Text style={{position:'absolute', right:0, padding:10}}>4</Text>
                </View>
            </View>

            <ScrollView style={{backgroundColor:'white', padding:10}}>
                <PostComment name="Kent anderson" content="mantap" time="19.00"/>
                <PostComment name="Kent anderson" content="mantap" time="19.00"/>
                <PostComment name="Kent anderson" content="mantap" time="19.00"/>
                <PostComment name="Kent anderson" content="mantap" time="19.00"/>
                <PostComment name="Kent anderson" content="mantap" time="19.00"/>
                <PostComment name="Kent anderson" content="mantap" time="19.00"/>

            </ScrollView>
            <View style={{flexDirection:'row' , backgroundColor:'white', padding:10}}>
                <TextInput placeholder="Ketik Disini" style={{borderWidth:1, backgroundColor:"white", width:'80%', borderRadius:10, padding:5, height:30, margin:10}} ></TextInput>
                <View style={{height:30 , width:30 , borderRadius:30, borderWidth:1, backgroundColor:'blue', margin:10}}></View>
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
        marginLeft: 20
    },
    timelinetext : {
        fontSize : 18,
        marginHorizontal : 18,
        marginVertical : 15
    }
})

export default PostReply