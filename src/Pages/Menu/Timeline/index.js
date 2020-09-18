import React , { useState, useEffect } from 'react';
import { View , Text, TouchableOpacity , StyleSheet ,ScrollView, FlatList, AsyncStorage, RefreshControl } from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import LeftLogo from '../../../../assets/chatWindow/left.svg';
import Contents from '../../../Component/Molekuls/Timeline';
import {ContentPicture} from '../../../Component/Atoms'
import {useSelector , useDispatch} from 'react-redux';
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage';
import { getCommentLength } from '../../../Config/Redux/restApi/'


const Timeline = ({navigation}) => {
    const getProfilePicture = async (user) => {
        const res = await storage().ref('images/' + user).getDownloadURL().catch(e =>{
            return false
        })
    
        return res
    }
    
    const getTimelinePost = () => {
        database().ref('post').on('value',async function(snapshot){
            const data = []
          if(snapshot.val() === null || snapshot.val() === undefined){
    
          } else {
            Object.keys(snapshot.val()).map(key => {
              data.push({
                id : key,
                data : snapshot.val()[key],
                profileImg : ''
              })
            })
            for(let i=0; i<data.length; i++){
                data[i] = {
                    ...data[i], 
                    profileImg : await getProfilePicture(data[i].data.username),
                    commentLength : await getCommentLength(data[i].id)
                }
            }
          }
            dispatch({type: 'SET_TIMELINEPOST' , value: data})
            isRefresing(false)
        })
    }

const gotoPostReply = (id) => {
    navigation.navigate('PostReply' , {id:id})
}

const [post, setPost] = useState([])
const [refreshing , isRefresing] = useState(false)
const dispatch = useDispatch()
const globalState = useSelector(state => state.postTimelineReducer)

const displayPost = async()=>{
    await getTimelinePost()
}

useEffect(()=>{
    displayPost()
},[])

const RenderItem = ({item}) => {
    return(
        <View> 
            {/* <Contents onpress={gotoPostReply} visible = {'none'} /> */}
                <Contents onpress={()=>{gotoPostReply(item.id)}} visible = {'none'} profileImage={item.profileImg} profilename={item.data.username} commentcount={item.commentLength} time={item.data.timestamp} content={item.data.value}/>  
        </View>
    )
}

const onRefresh1 = async () => {
    isRefresing(true)
    await getTimelinePost()
}

return(
    <View style={{flex:1}}>
        <View style={{flex:1, backgroundColor:'white'}}>
            <View style={[styles.header,{}]}>
                    <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                    <LeftLogo height={33} width={33}></LeftLogo>
                    </TouchableOpacity>      
                    <Text style={[styles.headerText,{}]}>Timeline</Text>
            </View>
            <View style={{flex:1}}>
                <Text style={[styles.timelinetext,{}]}>Explore Triangle</Text>
                {
                globalState.postList === undefined ? null : (
                    <FlatList 
                    onRefresh={onRefresh1}
                    refreshing={refreshing}
                    renderItem={RenderItem}
                    data={globalState.postList}
                    key={item => item.id}
                    />
                )
                }
            </View>
        </View> 
        <View style={{}}>
        {/* <NavigationMenu timeline="active" gotoHome={()=>{gtchat('Home')}}
            gotoChat={()=>{gtchat('Chat')}}
            gotoProfile={()=>{gtchat('Profile')}}     
            ></NavigationMenu> */}
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

export default Timeline;