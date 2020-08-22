import React , { useEffect , useState , Fragment } from 'react';
import { View, Text , StyleSheet , AsyncStorage, Image , ActivityIndicator } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native-gesture-handler';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import { useDispatch , useSelector } from 'react-redux';
import { saveDisplayName , saveStatusMessage , createNewGroup } from '../../Config/Redux/restApi/';
import ImagePicker from 'react-native-image-picker';
import Checked from '../../../assets/Home/tick.svg';
import storage from '@react-native-firebase/storage';
import Camera from '../../../assets/editprofile/ar-camera.svg'
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import Icon1 from 'react-native-vector-icons/Fontisto';

const NewGroup= ({navigation}) => {

  useEffect(()=>{
    getallfriend();
  },[])
    const [image , setimage] = useState('null')
    const [friend , setfriend] = useState([])
    const [groupname , setgroupname] = useState('')
    const [loading , setloading] = useState(false)
    const chooseFile = () => {
        var options = {
          title: 'Select Images',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error)
          } else {
            let source = response;
            setimage(source)
            console.log(source)
          }
        });
      };


      const getallfriend = async () => {
        const username = await AsyncStorage.getItem('username')
        const arr = await GetFriend(username)
        const arr1 = arr.map((item , index) => {
            item.isSelected = false
            return {...item}
        })
        setfriend(arr1)
      }

      const GetFriend = (username) => {
        const friendData = database().ref('users/' +username + '/friend').once('value').then(function(snapshot){
          const data = []
          if(snapshot.val() === null || snapshot.val() === undefined){
            console.log('data kosong')
          }else{
            Object.keys(snapshot.val()).map(key => {
              data.push({
                  id: key,
                  data: snapshot.val()[key],
                  })
              })    
          }
          return data
        })
         return friendData
      }

      const handleSelected = (ind) => {
        const arr = friend.map((item , index) => {
          if(ind === index){
            item.isSelected = !item.isSelected
          }
          return {...item}
      
        })
        setfriend(arr)
      }

      const renderItem = ({item,index}) => {
        return(
          <TouchableOpacity onPress={() => {handleSelected(index)}}>
          <View style={[style.borderlist,{}]}>
            <View style={[style.profilepicutre]}></View>
          <Text style={[style.profilename,{}]}>{item.data.friend}</Text>
            <View style = {[style.radiobutton]}>
              {
                item.isSelected ? (
                  <Icon1 size={15} name={"checkbox-active"} color={'green'} /> 
                ) : (
                  <Icon1 size={15} name={"checkbox-passive"} />
                )
              }
              
            </View>
          </View> 
          </TouchableOpacity>
        )
      }

      const createGroup = async () => {
          setloading(true)
          const username = await AsyncStorage.getItem('username')
          const data = {
            username : username,
            groupname : groupname
          }
          const groupid = await createNewGroup(data)

          if(image === 'null'){
            setloading(false)
          }else{
            console.log(image)
            const upload = await storage().ref('groupImage/' + groupid).putFile(image.path).then((snapshot)=>{

              console.log('image succesfully uploaded!')
              setloading(false)
            }).catch((e) => {
              console.log('error while uploading => ' + e);
              setloading(false)
            })
          }
      }
 
    return(
        <View style={{flex:1}}>
             <View style={{flex:2, backgroundColor:'rgba(27,176,233,1)' , borderBottomLeftRadius:41, borderBottomRightRadius:41, position:'relative'}}>
             <View style={{position:'relative'}}>
                <View style={{flexDirection : 'row', alignItems: 'center', padding: 16, justifyContent : 'space-between'}}>
                    <TouchableOpacity style={{}}>
                        <LeftLogo width={30} height={30}/>
                    </TouchableOpacity>
                    <Text style={[style.Header , {}]}>New Group</Text>
                    <TouchableOpacity onPress={createGroup} style={{}}>
                      <Checked width={30} height={30}/>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', position:'relative'}}>
                    <TouchableOpacity onPress={chooseFile} style={{borderWidth:1, height : 95, width: 95, borderRadius: 100, backgroundColor:'#FFFFFF',borderColor:'#707070'}}>
                    </TouchableOpacity>
                </View>
                </View>
             </View>
             <View style={{flex:3}}>
                <View style={{marginHorizontal:21, marginVertical:35}}>
                    <ActivityIndicator animating={loading} color={'rgba(27,176,233,1)'} size={'large'} style={{position:'absolute', right:'50%'}} />
                        <Text style={{fontSize:14, fontFamily:'ITCKRISTEN'}}>Group Name</Text>
                        <TextInput onChangeText={(text)=>{setgroupname(text)}} value={groupname} maxLength={13}  style={{borderBottomWidth:1, height:40, marginBottom:10}}></TextInput>
                        <Text style={{fontSize : 18,fontWeight : 'bold'}}>Choose Friend</Text>

                        <View style={[style.input,{paddingHorizontal:'5%', elevation:5}]}>
                        <View style={{position:'absolute',marginVertical:'2.5%', marginLeft: '6%'}}>
                        <Icon name="search" color={'gray'} size={23} />
                        </View>
                        <TextInput onChangeText={(e)=>{searchUser(e)}} placeholder="Search Friends" style={{}}></TextInput>
                        </View>
                        <FlatList
                        data = {friend}
                        renderItem = {renderItem}
                        keyExtractor = {item => item.id}
                        />

                </View>
              
             </View>
        
              
        </View>
    )
}
const style = StyleSheet.create({
    addfriend : {
        position: 'absolute',
        right: 0,
    },
    Header : {
        color : '#FFFFFF',
        fontSize : 18,
        fontFamily : 'ITCKRISTEN',
        textAlign : 'center',
        padding : 16,
    },
    camerapicture : {
      width : 25,
      height : 25
    },
    input : {
      shadowColor : 'black',
      shadowOpacity: 0.1,
      shadowRadius: 0.5,
      shadowOffset: {
        height: 1,
        width: 0,
      },
      backgroundColor: 'white',
      borderColor : '#707070',
      height:40,
      width:'95%',
      marginHorizontal: 10,
      borderRadius : 17,
      marginVertical : 13,
      paddingLeft : 50,
      fontFamily : 'ITCKRISTEN',
  },
  borderlist : {
    height : 56,
    borderRadius: 30,
    flexDirection : 'row',
    marginBottom : 6
},
profilepicutre : {
    borderWidth : 1,
    borderRadius: 20,
    height : 40,
    width : 40,
    marginLeft : 18,
    justifyContent: 'center',
    alignItems : 'center',
    marginTop : 6
},
profilename : {
    fontSize : 18,
    paddingLeft: 10,
    alignItems : 'center',
    marginTop : 14,
    marginLeft : 5,
    fontFamily: 'Google-Sans'
},
radiobutton : {
    position : 'absolute',
    right : '3%',
    top:'35%'
    
    

}
})

export default NewGroup;