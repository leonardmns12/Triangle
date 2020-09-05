import React, { useEffect, useState } from 'react';
import {View , Text , StyleSheet , TouchableOpacity , ScrollView , AsyncStorage , FlatList , RefreshControl , Image } from 'react-native'
import PostComment from '../../Component/Molekuls/PostReplyComment/';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import OptionIcon from 'react-native-vector-icons/SimpleLineIcons'
import BackIcon from 'react-native-vector-icons/Ionicons'
import { getPostName , getPostTimestamp , getPostValue , sendReply , getReplyPost} from '../../Config/Redux/restApi/'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import { useDispatch , useSelector } from 'react-redux'

const PostReply = ({navigation,route}) => {
    useEffect(()=>{
        getpostreply()
        getreply(limit)

        return() => {
            dispatch({type:'SET_REPLYLIST' , value:[]})
        }
    },[])
    const dispatch = useDispatch()
    const postReplyState = useSelector(state => state.replyPostReducer)
    const [name , setname] = useState('')
    const [value , setvalue] = useState('')
    const [time , settime] = useState('')
    const [replyLength , setreplyLength] = useState('')
    const [textinput , setinput] = useState('')
    const [refreshing , isRefresing] = useState(true)
    const [replies , setreplies] = useState([])
    const [pict, setpict] = useState('')
    const [limit , setlimit] = useState(5)
    const [dataLength , setDataLength] = useState(10)

    const getProfilePicture = async (user) => {
        const res = await storage().ref('images/' + user).getDownloadURL().catch(e =>{
            return false
        })
    
        return res
    }

    const getReplyPost = (id,lmt) =>{
        const res = database().ref('post/' + id + '/comment').limitToLast(lmt).once('value').then(async function(snapshot){
          const data = []
           if(snapshot.val() === null || snapshot.val() === undefined){
              console.log('data kosong')
           } else{
            Object.keys(snapshot.val()).map(key => {
              data.push({
                id : key,
                data : snapshot.val()[key],
                profileImg : ''
              })
            })
            for(let i=0; i<data.length;i++){
                data[i] = {
                    ...data[i],
                    profileImg : await getProfilePicture(data[i].data.sender)
                }
            }
          }
          dispatch({type:'SET_REPLYLIST' , value:data})
          return data
        })
        return res
    }

    const getpostreply = async () => {
        const res = await getPostName(route.params.id)
        setname(res)
        const res2 = await getPostValue(route.params.id)
        setvalue(res2)
        const res3 = await getPostTimestamp(route.params.id)
        settime(res3)
        const res4 = await getProfilePicture(res)
        setpict(res4)
    }

    const reply = async () => { 
        if(textinput !== ''){
        const sender = await AsyncStorage.getItem('username')
        const data = {
            sender : sender,
            value : textinput,
            timestamp : new Date().getTime()
        }
        await sendReply(route.params.id , data)
        setinput('')
        }
        await getReplyPost(route.params.id,limit)
    }

    const getreply = async() =>{
        const res = await getReplyPost(route.params.id,limit)
        setreplies(res)
    }

    const RenderItem = ({item}) => {
        return(
            <View style={{paddingLeft:10}}> 
                <PostComment profileImage={item.profileImg} name={item.data.sender} content={item.data.value} time={item.data.timestamp}/> 
            </View>
        )
    }

    const onRefresh = async () => {
        isRefresing(true)
        await getTimelinePost()
    }

    const loadMore = () => {
        const getMore = async () => {
            await getReplyPost(route.params.id,limit+3)
            setlimit(limit+3)
            setDataLength(dataLength-3)
        }
        return (
            dataLength > 0 && postReplyState.replyList.length > 0 ? (
                <View style={{padding:"3%", flexDirection:"row", }}>
                <TouchableOpacity onPress={()=>{
                    getMore()
                }}>
                    <Text style={{}}>Load more comments</Text>
                </TouchableOpacity>
                <Text style={{marginLeft:"3%", padding:"1%", fontSize:10, color:"grey"}}>{dataLength} more</Text>
                </View>
            ) : null
        )
    }

    return(
        <View style={{backgroundColor:'white', flex:1}}>
            <View style={[styles.header,{}]}>
                <BackIcon name="chevron-back-circle-outline" size={40} color="white" style={{padding:8, paddingRight:0}}/>
                <TouchableOpacity style={{paddingLeft:18, paddingTop:11}}> 
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute' , right:'3%', top:'8%'}}>
                </TouchableOpacity>
                <Text style={[styles.headerText,{}]}>Timeline</Text>
            </View>
            <View style={{marginTop:"2%", backgroundColor:"white"}}>
                <View style={{flexDirection:'row', paddingLeft:10}}>
                    {
                        !pict ? (
                            <View style={[styles.profilePict]}></View>
                        ) : (
                            <Image source={{uri:pict}} style={[styles.profilePict]}/>
                        )
                        
                    }
                    <Text style={[styles.profileName]}>{name}</Text>
                    <View style={{position:'absolute', right:0, padding:"0%" , flexDirection:'row', marginLeft:"2%"}}>
                        <TouchableOpacity>
                            <OptionIcon name="options-vertical" size={22} style={{padding:0, paddingTop:4}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{marginTop:"3%", marginBottom: "0%", padding:"8%", backgroundColor:"#E9EBEE"}}>{value}</Text>
                </View>
                <View style={{flexDirection:'row' , borderBottomWidth:1, padding:10, borderBottomColor:"black"}}>
                        <Text style={{fontFamily:'ITCKRISTEN', color:"grey"}}>{time}</Text>
                    <View style={{position:'absolute', right:0, padding:10 , flexDirection:'row'}}>
                    <Icon name="comment-text-multiple-outline" size={20} color="#1BB0DF" />
                    <Text style={{marginLeft:5, color:"grey"}}>{replyLength}</Text>
                    </View>
                </View>
            </View>
            {
                    postReplyState.replyList === undefined ? null : (
                    <FlatList 
                    renderItem={RenderItem}
                    data={postReplyState.replyList}
                    key={item => item.id}
                    RefreshControl = {
                        <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        />
                    }
                    inverted
                    ListFooterComponent={loadMore}
                    />
                    )
            }

            <View style={{flexDirection:'row' , backgroundColor:'transparent', padding:0, margin:0 , height:'auto'}}>
                <TextInput value={textinput} onChangeText={(e)=>{
                    setinput(e)
                }} placeholder="Reply here" style={[styles.inputComment]}/>
                <TouchableOpacity onPress={reply} >
                    <Icon name="send-circle" size={38} color="#1BB0DF" style={{paddingTop:10}}/>
                </TouchableOpacity>
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
        marginLeft: 0
    },
    timelinetext : {
        fontSize : 18,
        marginHorizontal : 18,
        marginVertical : 15
    },
    profilePict : {
        height:30 , 
        width:30 , 
        borderRadius:30, 
        borderWidth:1
    }, 
    profileName : {
        marginLeft:10, 
        justifyContent:'center' , 
        alignItems:'center', 
        paddingTop:5, fontWeight:"bold", 
        fontSize:16,
    }, 
    inputComment : {
        backgroundColor:"white", 
        width:'80%', 
        borderRadius:25, 
        padding:10,  
        height:35, 
        margin:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    }
})

export default PostReply