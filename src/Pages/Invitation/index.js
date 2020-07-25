import React , { useEffect, useState } from 'react';
import { View , StyleSheet , TouchableOpacity , Text } from 'react-native';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import { ScrollView } from 'react-native-gesture-handler';
import Invitationlist from '../../Component/Molekuls/Invitationlist/';
import firebase from '../../Config/Firebase/';
const Invitation = ({navigation}) => {
    
    useEffect(() => {
        // getpendinglist('leonardganteng')
          cpendinglist(getpendinglist('leonardganteng'))
    },{})
    
    const [pendinglist , cpendinglist] = useState([])
    

    const getpendinglist = (userId) => {
        const data = []
        const datapendinglist = firebase.database().ref('users/' + userId + '/pendingFriend');
        datapendinglist.on('value', function(snapshot){
            if(snapshot.val() === null || snapshot.val() === undefined){
                
            }else{
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key]
                    })
                })
                
                // cpendinglist(getpendinglist('leonardganteng'))
            }
        })

        return data;
    }
    const accept = () => {
        console.log(pendinglist)
    }
    
    const fetchpending = () => {
        
    }
    
    return(
        <View style={{flex:1}}>
             <View style={[styles.header,{}]}>
                    <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                    <LeftLogo height={33} width={33}></LeftLogo>
                    </TouchableOpacity>
                    <Text style={[styles.headerText,{}]}>Invitation</Text>
            </View>
          
            <Text style={[styles.titletext,{}]}>Incoming Invitation</Text>
            <View style={{flex : 1, alignItems:'center', justifyContent:'center'}}>
            <ScrollView style={{flex:1 }}>
            <Invitationlist name={"Kenny ongko"} visible={"block"} />
            <Invitationlist name={"Kenny ongko"} visible={"block"}/>
            <Invitationlist name={"Kenny ongko"} visible={"block"}/>
            </ScrollView>
            </View>
            <Text style={[styles.titletext,{}]}>Pending Invitation</Text>
            <View style={{flex:1 , alignItems:'center', justifyContent:'center'}}>
            <ScrollView style={{flex:1}}> 
            <Invitationlist name={"Kenny ongko"} visible={"none"} />
            <Invitationlist name={"Kenny ongko"} visible={"none"}/>
            {
              pendinglist.map((id,key) => {
                return(
                 <Invitationlist name={id.data.friend} visible={"none"}/>
                )
            }) 
            }
            </ScrollView>
            </View>
         
        </View>
    )
}

const styles = StyleSheet.create({
    header : {
        height : 57,
        backgroundColor : '#00BFA6',
        flexDirection : 'row'
    },
    headerText : {
        fontSize : 20,
        fontFamily : 'ITCKRISTEN',
        color : '#FFFFFF',
        paddingTop : 15,
        marginLeft: 20
    },
    titletext : {
        fontSize : 14,
        fontFamily : 'ITCKRISTEN',
        marginHorizontal : 13,
        marginVertical : 12
    }
})

export default Invitation;