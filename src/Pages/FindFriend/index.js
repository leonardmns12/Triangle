import React, { Fragment, useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, ScrollView } from 'react-native-gesture-handler';
import { View , Text, StyleSheet } from 'react-native';
import NavigationMenu from '../../Component/Molekuls/NavigationMenu';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import Search from '../../../assets/search.svg';
import {ResultFriend} from '../../Component/';
import firebase from '../../Config/Firebase/';
import { useDispatch, useSelector } from 'react-redux';

const FindFriend = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    const [name , cname] = useState('');

    const findUser = (username) => {
        const finduser = firebase.database().ref('users/' + username)
        finduser.on('value' , function(snapshot){
          const data = []
          // Object.keys(snapshot.val());
            if(snapshot.val() === null){
                cname(false);
            }else{
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key]
                    })
                })
                cname(data[0].data.username)
            }
      })
    } 
    const findfriend = useSelector(state => state.findFriendReducer);
    const dispatch = useDispatch();
    const [id , setid] = useState('');
    const [data , setdata] = useState('');
    const onChange = async (e) => {
       await setid(e)
    }  
    const onClickSearch = async () => {
    
        if ( id == ''){
            alert('id cannot be null')
        }else{
           await findUser(id);

        }     
    }

    const findingFriend = (names) => {
        if (names === ''){

        }else if(names === false){
            return  <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
            <Text>User not found.</Text>
            </View>
        }else{
            return  <ResultFriend name={name} />
        }
    }
     

    return(
        <Fragment>
            <View style={{flex:1}}>
                <View style={[styles.header,{}]}>
                    <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                    <LeftLogo height={33} width={33}></LeftLogo>
                    </TouchableOpacity>
                    <Text style={[styles.headerText,{}]}>Find Friend</Text>
                </View>
                <View style={{flex:1}}>
                    <View style={{marginTop:10, marginHorizontal:18, marginBottom: 10, flexDirection:'row'}}>
                        <View style={{borderWidth:1, height: 22, width:22 , borderRadius: 100, backgroundColor: '#00BFA6'}}></View>
                        <Text style={{marginLeft:7}}>ID</Text>
                    </View>
                    <View style={{marginHorizontal:18, flexDirection: 'row'}}>
                    <TextInput style={[styles.input,{}]} value={id} placeholder="Enter your friend's ID" onChangeText={ (e) => {onChange(e)} }></TextInput>
                    <TouchableOpacity onPress={onClickSearch} style={{borderWidth:1, width: 44, height: 36, backgroundColor:'#FFFFFF', alignItems: 'center' , justifyContent: 'center'}}>
                    <Search height={25} width={25}></Search>
                    </TouchableOpacity>
                    </View>
                    {
                        findingFriend(name)
                    }
                </View>
            </View>
            <View>
            <NavigationMenu home="active" gotoChat={()=>{gtchat('Chat')}}
                gotoTimeline={()=>{gtchat('Timeline')}}
                gotoProfile={()=>{gtchat('Profile')}}     
                ></NavigationMenu>
            </View>
        </Fragment>
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
    input : {
        borderWidth : 1,
        height : 36,
        width : 280,
        paddingLeft : 29,
        fontWeight : 'bold',
        backgroundColor : '#FFFFFF'
    }
})

export default FindFriend;