import React , { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChatIcon from '../../../../assets/navigation/comment-active.svg';
import {ContentPicture} from '../../../Component/Atoms'
import { useDispatch , useSelector } from 'react-redux';
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage';


const Timeline = ({navigation,profilename,content,commentcount,time,visible,onpress}) => {
  const isPicture = (visible) => {
      if(visible == 'block'){
        
        return <View style={[style.picture]}><ContentPicture /></View>

      }else{
        return <View style={[style.picture],{display:'none'}}></View>
      }
  }
/*
    const getProfilePicture = async (user) => {
        const res = await storage().ref('images/' + user).getDownloadURL().catch(e =>{
            return false
        })
        return res
    }
    const getTimelinePost = async() => {
        const res = database.ref('Post').once('value').then(async function(snapshot){
            const data = []
            if(snapshot.val() === null || snapshot.val() === undefined){

            } else {
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key, 
                        data: snapshot.val()[key], 
                        profileImg : ''
                    })
                })
            for(let i=0; i< data.length; i++){
                data[i] = {
                    ...data[i], 
                    profileImg : await getProfilePicture(data[i].timeline)
                }
            }
            }
            return data
        })
        return res
    }

    const dispatch = useDispatch()
    const globalState = useSelector(state => state.timelinePostReducer)
    const DisplayTimelinepost = async () => {
        const username = await AsyncStorage.getItem('username')
        //const res = await getTimelinePost()
        dispatch({type:'SET_TIMELEINEPOST', value:res})
    }

    useEffect(() =>{
        DisplayTimelinepost() 
        getProfilePicture(user)
    }, [])
*/
    return (
        <TouchableOpacity onPress={onpress} style = {[style.border]}> 
            <View style = {{flexDirection : 'row'}}>
                <View style = {[style.borderimage]}></View>
                  <Text style = {{marginVertical : 25}}>{profilename}</Text>
                <View style = {[style.commentbar]}>
                <ChatIcon width = {20} height = {20}/>
                  <Text style = {{marginLeft : 5 ,marginTop : '-8%'}}>{commentcount}</Text>
                </View>
            </View>
            <View style = {{ minHeight : 35, maxHeight : 350}}>
            
                    {isPicture(visible)}

                 <Text style = {{marginHorizontal : 20}} >{content}</Text> 

            </View>
            <View style = {[style.FooterContent]}>
                <Text style = {[style.Time]}>{time}</Text>
                <View style = {[style.ReplyButton]} ><Text style = {[style.ReplyText]}> Reply</Text></View>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
     borderimage: {
        borderWidth : 1,
        borderColor : '#000000',
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        width : 46,
        height : 46,
        marginHorizontal : 12,
        marginVertical : 10,
    },
    commentbar: {
        position : "absolute",
        marginTop : 25 ,
        width : 20 ,
        height : 20 ,
        right : '20%' ,
        flexDirection :'row'
    },
    FooterContent: {
        
        bottom : '0%',
        position : "relative",
        flexDirection : 'row',
        marginHorizontal : 20,
        marginVertical : 20,
        opacity : 0.7,      
    },
    ReplyButton : {
            position : "absolute",
            right : 0,
            right : '10%'
    },
    ReplyText : {
        color : '#00BFA6',
        fontWeight : "bold",
    },

    border : {
        
        marginVertical : 15,
        marginHorizontal : 18,
        backgroundColor: '#FAFAFA',
        shadowColor:'#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius:5.46,
        elevation: 9,
        borderRadius : 30,
        width : '90%',
        maxHeight : 360,   
        minHeight : 160,
    },
    Time : {
        fontFamily:'ITCKRISTEN',
        color : 'rgba(0,0,0,0.5)',
    },
    picture : {
    
        marginBottom : 10
    }
})

export default Timeline;