import React, { Fragment, useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import { View , Text, StyleSheet, AsyncStorage , ActivityIndicator } from 'react-native';
import NavigationMenu from '../../Component/Molekuls/NavigationMenu';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import Search from '../../../assets/search.svg';
import {ResultFriend} from '../../Component/';
import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend , checkPending , checkfriend , checkIncoming} from '../../Config/Redux/restApi/';
import Contact from '../../../assets/invite/contact.svg';

const FindFriend = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    const findUser = (username , friend) => {
        const finduser = database().ref('users/' + friend)
        finduser.on('value' , async function(snapshot){
          const data = []
          // Object.keys(snapshot.val());
            if(snapshot.val() === null){
                setfound(false)
                setLoading(false)
            }else{
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key]
                    })
                })
                setfound(true)
                const alreadyfriend = await checkfriend(username , id)
                if(alreadyfriend){
                    setisfriend(true)
                    setLoading(false)
                    cname(id)
                    console.log('change to 1:' +id)
                }else{
                    const checkincomingfriend = await checkIncoming(username , id);
                    if(checkincomingfriend === true){
                        console.log(checkincomingfriend)
                        setincoming(true)
                        cname(id)
                        setLoading(false)
                    }else{
                        setincoming(false)
                        const res = await checkPending(username , id);
                        setisfriend(false)
                        if(res){
                            setpending(true)
                            cname(id)
                            setLoading(false)
                        }else{  
                            setpending(false)
                            cname(id)
                            setLoading(false)
                        }
                    }
                }
                
            }
      })
    }
    //state and redux
    const findfriend = useSelector(state => state.findFriendReducer);
    const dispatch = useDispatch();
    const [id , setid] = useState('');
    const [found , setfound ] = useState('');
    const [loading , setLoading] = useState(false);
    const [name , cname] = useState('');
    const [pending , setpending] = useState(false);
    const [onclick, conclick] = useState(false)
    const [isfriend , setisfriend] = useState(false)
    const [isincoming , setincoming] = useState(false)

    //state and redux 
    const onChange = async (e) => {
       await setid(e)
    }  
    const onClickSearch = async () => {
            const value = await AsyncStorage.getItem('username')
            cname('')
            setLoading(true)
            if( id == '' || id == value){
                conclick(false)
                setLoading(false)
            }
            else{
                conclick(true)
                await findUser(value,id);
            }     

    }
    const gotoinvitation = () => {
        navigation.navigate('Invitation')
    }

    const gotoHomes = () => {
        navigation.replace('Home')
    } 
    const adding = async (name) => {
        const sender = await AsyncStorage.getItem('username')
        const data = {
            sender : sender ,
            receiver : name,
        }
        addFriend(data);  
        setpending(true) 
    }

    const fetchList = () => {
        if(onclick === true && found === true && pending === true && loading === false){
            return  <ResultFriend name={name}  status={'Added'} bgcolor={'#707070'} />
        }
        if(onclick === true && found === false && loading === false){
            return <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
            <Text>User not found.</Text>
            </View>
        }
        if(onclick === true && found === true && pending === false && isfriend === false && isincoming === false && loading === false){
            return  <ResultFriend name={name} onpress={()=>{adding(name)}}  status={'Add'} bgcolor={'#00BFA6'} />
        }
        if(onclick === true && found === true && isfriend === true && loading === false && name !== ''){
            return  <ResultFriend name={name}  status={'Already Friend'} bgcolor={'#00BFA6'} />
        }
        if(onclick === true && found === true && isfriend === false && isincoming === true && loading === false){
            return  <ResultFriend name={name} onpress={gotoinvitation}  status={'Accept Friend'} bgcolor={'green'} />
        }
        // conclick(false)
    }

    useEffect(()=>{
        if(onclick === true){
            dispatch({type: 'SET_RENDER' , value:true})
        }
    },[onclick,pending])

    return(
        <Fragment>
            <View style={{flex:1}}>
                <View style={[styles.header,{}]}>
                    <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                    <LeftLogo onPress={gotoHomes} height={33} width={33}></LeftLogo>
                    </TouchableOpacity>
                    <Text style={[styles.headerText,{}]}>Find Friend</Text>
                    <View  style={{position : 'absolute' , right:'5%', top:'25%'}}>
                        <Contact  onPress={gotoinvitation} width={25} height={22} />
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={{marginTop:10, marginHorizontal:18, marginBottom: 10, flexDirection:'row'}}>
                        <View style={{borderWidth:1, height: 22, width:22 , borderRadius: 100, backgroundColor: '#1BB0DF'}}></View>
                        <Text style={{marginLeft:7}}>ID</Text>
                    </View>
                    <View style={{marginHorizontal:'10%', flexDirection: 'row'}}>
                    <TextInput style={[styles.input,{}]} value={id} placeholder="Enter your friend's ID" onChangeText={ (e) => {onChange(e)} }></TextInput>
                    <TouchableOpacity onPress={onClickSearch} style={{borderWidth:1, width: 44, height: 36, backgroundColor:'#FFFFFF', alignItems: 'center' , justifyContent: 'center'}}>
                    <Search height={25} width={25}></Search>
                    </TouchableOpacity>
                    </View>
                    <ActivityIndicator size={'large'} animating={loading} />
                    {
                       findfriend.render === true ? (
                           fetchList()
                       ) : null
                    }
                </View>
            </View>
            <View>
            {/* <NavigationMenu home="active" gotoChat={()=>{gtchat('Chat')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoProfile={()=>{gtchat('Profile')}}     
                ></NavigationMenu> */}
            </View>
        </Fragment>
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
    input : {
        borderWidth : 1,
        height : 36,
        width : '85%',
        paddingLeft : 29,
        fontWeight : 'bold',
        backgroundColor : '#FFFFFF'
    }
})

export default FindFriend;