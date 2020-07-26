import React , { useEffect, useState } from 'react';
import { View , StyleSheet , TouchableOpacity , Text, AsyncStorage } from 'react-native';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import { ScrollView } from 'react-native-gesture-handler';
import Invitationlist from '../../Component/Molekuls/Invitationlist/';
import firebase from '../../Config/Firebase/';
import { useDispatch , useSelector } from 'react-redux'
import { addtofriend , addtofriend1 } from '../../Config/Redux/restApi/';
import { SvgCss } from 'react-native-svg';


const Invitation = ({navigation}) => {
    const InvitationState = useSelector(state => state.invitationReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        // getpendinglist('leonardganteng')
       starter()
    },[]) 

    const starter = async () => {
        try{
            const getSender = await AsyncStorage.getItem('username');
            alert(getSender)
            getpendinglist(getSender)
            getincominglist(getSender)
        }catch{
            console.log('error')
        }
    }
    const getpendinglist = (userId) => {
    const datapendinglist = firebase.database().ref('users/' + userId + '/pendingFriend');
    datapendinglist.on('value', function(snapshot){
        const data = []
        if(snapshot.val() === null || snapshot.val() === undefined){
            dispatch({type:'SET_LIST',  value: data});
        }else{
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
        dispatch({type:'SET_LIST',  value: data});
            }
        })
    }
    const getincominglist = (userId) => {
    const dataincoming = firebase.database().ref('users/' + userId + '/incomingFriend')
    dataincoming.on('value', function(snapshot){
        const data1 = []
        if(snapshot.val() === null || snapshot.val() === undefined){
            dispatch({type:'SET_INCOMING',  value: data1});
        }else{
            Object.keys(snapshot.val()).map(key => {
                data1.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
        dispatch({type:'SET_INCOMING',  value: data1});
        }
    })
}
    const [rid, crid] = useState('')
    const [sid, csid] = useState('')
    function search(nameKey , myArray){
        for(var i = 0; i < myArray.length; i++){
            if(myArray[i].data.friend === nameKey){
                return myArray[i].id;
            }
        }
    }
    const getId = (username , from , key, types ) => {
         console.log('users/' + username + '/' + from + '/' + key)
        const getdata =  firebase.database().ref('users/' + username + '/' + from).once('value').then(async function(snapshot){
            const data1 = []
            if(snapshot.val() === undefined || snapshot.val() === null){
              // crid('')
              // csid('')
              console.log("1111")
            }
            else{
                Object.keys(snapshot.val()).map(key => {
                    data1.push({
                        id: key,
                        data: snapshot.val()[key]
                    })
                })
                if(types == 'receiverid'){
                    crid(await search(key,data1))
                   
    
                }else{
                    csid(await search(key,data1))                
                }
                console.log(types)
            }
        })
        
    }

    const accept = async (e) => {
        
        const getSender = await AsyncStorage.getItem('username');
        await getId(getSender , 'incomingFriend' , e , 'receiverid')
        await getId( e , 'pendingFriend' , getSender , 'senderid')
        await addtofriend(getSender, e ,  sid, rid)
        await addtofriend1(getSender, e ,  sid, rid)  
      
        console.log(e)
    
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
            {
                InvitationState.listincoming.map((id,key) => {
                    key = {key}
                    return(
                        <Invitationlist name={id.data.friend} visible={"block"} funct={()=>{accept(id.data.friend)}}/>
                    )
                }) 
            }
            </ScrollView>
            </View>
            <Text style={[styles.titletext,{}]}>Pending Invitation</Text>
            <View style={{flex:1 , alignItems:'center', justifyContent:'center'}}>
            <ScrollView style={{flex:1}}> 
            {
              InvitationState.listpending.map((id,key) => {
                key={key}
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