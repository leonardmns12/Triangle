import React from 'react'
import {View , Text, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'

const CreatePost = () => {
    return(
        <View style={{flex: 1}}>
            <View style={{position: 'absolute',right:0,  padding:"0%" , flexDirection:'row', marginLeft:"2%"}}>
                <TouchableOpacity style={{backgroundColor:'#00C2FF',width:80, height:'100%', borderRadius:10 , borderColor:'rgb(0,191,166)', alignItems:'center', marginTop:'10%'}}>
                    <Text style={{color:'white', fontSize:18, textAlign:'center'}}>
                        Post
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop: "20%",flex: 1}}>
                <Text style={{marginLeft:"5%", marginRight: "5%"}}>Post Something news</Text>
                <Text style={{marginLeft:"5%", marginRight: "5%"}}>other people can see your post</Text>
            </View>
            
            <View style={{flex: 10}}>
                <View style={{ backgroundColor:"#E9EBEE",height:"70%", marginHorizontal: "5%", marginTop: "5%"}}>
                    <TextInput placeholder="What's news?" style={[styles.inputComment]} multiline={true} maxLength={150}/>
                </View>
            </View>
            

            <View style={{ backgroundColor:"#E9EBEE", flexDirection: "row", height:"10%"}}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} ><Icon name={'picture'} size={40} style={[styles.icon1] }/></View>
                <View style={{flex: 1,justifyContent: "center", alignItems: "center"}}><Icon name={'camera'} size={40} style={[styles.icon2]}/></View>
            </View>
            
        </View>

    )
}

const styles =  StyleSheet.create({
    
    inputComment : {
        backgroundColor:"transparent", 
        width:'80%', 
        padding: 10, 
        marginTop: "5%",
        marginLeft:"5%", 
        marginRight: "5%",  
        color:"grey"
    },

    icon1 : {
        
    },

    icon2 : {
       
    }
})

export default CreatePost;