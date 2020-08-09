import React , { useEffect, useState } from 'react';
import { View , StyleSheet , TouchableOpacity , Text, AsyncStorage , FlatList } from 'react-native';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import { ScrollView } from 'react-native-gesture-handler';
import Invitationlist from '../../Component/Molekuls/Invitationlist/';
import database from '@react-native-firebase/database';
import { useDispatch , useSelector } from 'react-redux';
import { addtofriend , addtofriend1 ,getId } from '../../Config/Redux/restApi/';

const Invitation = ({navigation}) => {
    const InvitationState = useSelector(state => state.invitationReducer)
    const dispatch = useDispatch()
    const[loading , setloading] = useState(false);
    useEffect(() => {
        // getpendinglist('leonardganteng')
       starter()
    },[]) 

    const starter = async () => {
        try{
            const getSender = await AsyncStorage.getItem('username');
            
            getpendinglist(getSender)
            getincominglist(getSender)
        }catch{
            console.log('error')
        }
    }
    const getpendinglist = (userId) => {
    const datapendinglist = database().ref('users/' + userId + '/pendingFriend');
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
    const dataincoming = database().ref('users/' + userId + '/incomingFriend')
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
    
   

    const accept = async (e,type) => {
        if(loading === false){
            setloading(true)
            const getSender = await AsyncStorage.getItem('username');
            const rid = await getId(getSender , 'incomingFriend' , e ) 
            const sid = await getId( e , 'pendingFriend' , getSender)
            if(type === 'accept'){  
                await addtofriend(getSender, e ,  sid, rid)
                await addtofriend1(getSender, e ,  sid, rid) 
                setloading(false)
            }
            if(type === 'decline'){
                await addtofriend1(getSender, e ,  sid, rid) 
                setloading(false)
            }
            if(type === 'cancelinvite'){

                const ridc = await getId(getSender , 'pendingFriend' , e , 'receiverid') 
                const sidc = await getId(e , 'incomingFriend' , getSender , 'senderid')
                await addtofriend1(e, getSender ,  ridc, sidc) 
                setloading(false)
            }
            
        }
    }

    const gotoFindFriend = () => {
        navigation.replace('FindFriend')
    }
    const renderItem = ({ item }) => (
        <Invitationlist decline={()=>{accept(item.data.friend,'decline')}} name={item.data.friend} visible={"block"} funct={()=>{accept(item.data.friend,'accept')}}/>
      );
    const renderItem2 = ({ item }) => (
        <Invitationlist decline={()=>{accept(item.data.friend,'cancelinvite')}} name={item.data.friend} visible={"none"} funct={null}/>
    );
    return(
        <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
             <View style={[styles.header,{}]}>
                    <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                    <LeftLogo onPress={gotoFindFriend} height={33} width={33}></LeftLogo>
                    </TouchableOpacity>
                    <Text style={[styles.headerText,{}]}>Invitation</Text>
            </View>
          
            <Text style={[styles.titletext,{}]}>Incoming Invitation</Text>
            <View style={{flex : 1, alignItems:'center', justifyContent:'center'}}>
              <FlatList
                data = {InvitationState.listincoming}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            </View>
            <Text style={[styles.titletext,{}]}>Pending Invitation</Text>
            <View style={{flex:1 , alignItems:'center', justifyContent:'center'}}>
            <FlatList
                data = {InvitationState.listpending}
                renderItem={renderItem2}
                keyExtractor={item => item.id}
                />
            </View>
         
        </View>
    )
}

const styles = StyleSheet.create({
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
    titletext : {
        fontSize : 14,
        fontFamily : 'ITCKRISTEN',
        marginHorizontal : 13,
        marginVertical : 12
    }
})

export default Invitation;