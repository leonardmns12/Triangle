import React, { useEffect } from 'react'
import { View , Text , StyleSheet , ScrollView, TouchableOpacity } from 'react-native'
const GroupInvitation = ({route, navigation}) =>{
    useEffect(()=>{
        
    },[]) 

    return(
        <View>
            <View style={{backgroundColor:"#DCDCDC" , padding:"6%"}}>
                <Text style={{marginLeft:"23%", fontSize:16}}>Incoming Group Invitation</Text>
            </View>
            <ScrollView style={{marginTop:"5%"}}>
                <Text style={{marginLeft:"23%", fontSize:16 , marginTop:"3%"}}>nyoba doang wen</Text>
                <Text style={{marginLeft:"23%", fontSize:16 , marginTop:"3%"}}>wa gtw mo ngasih ap</Text>
                <Text style={{marginLeft:"23%", fontSize:16 , marginTop:"3%"}}>akibat tidak ad design nya</Text>
                <Text style={{marginLeft:"23%", fontSize:16 , marginTop:"3%"}}>gtw mo isi apa gils :)</Text>
            </ScrollView>
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