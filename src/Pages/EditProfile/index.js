import React , { useEffect , useState , Fragment } from 'react';
import { View, Text , StyleSheet , AsyncStorage, Image } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import { useDispatch , useSelector } from 'react-redux';
import { saveDisplayName , saveStatusMessage } from '../../Config/Redux/restApi/';
import ImagePicker from 'react-native-image-picker';
import Checked from '../../../assets/Home/tick.svg';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import Camera from '../../../assets/editprofile/ar-camera.svg'

const EditProfile = ({navigation}) => {
    const [mounting , setMounting] = useState(false);
    useEffect(()=>{
        starter();

      return () => {
        setMounting(true)
      }
    },[mounting])
    const starter = async () => {
      const username = await AsyncStorage.getItem('username');
      getDisplayName(username)
      getStatusMessage(username)
      const uri = await storage()
      .ref('images/' + username)
      .getDownloadURL().catch(e => {
        console.log(e)
      })
      if(uri !== undefined){
        const url = { uri : uri}
        setCurrentImg(url)
      }
      
    }
    const [currentImg , setCurrentImg] = useState('')
    const [filePath , setFilePath] = useState('default');
    const getDisplayName = (username) => {
      const displaydata = database().ref('users/' + username + '/displayname/displayname')
      .once('value').then(async function(snapshot){
        dispatch({type: 'SET_EDITPROFILE' , inputType : 'displayname' , value:snapshot.val()})
      })
    }
    const getStatusMessage = (username) => {
      const displayMessage = database().ref('users/' + username + '/statusmessage/statusmessage')
      .once('value').then(async function(snapshot){
        dispatch({type: 'SET_EDITPROFILE' , inputType : 'statusmessage' , value:snapshot.val()})
      })
    }
    const chooseFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
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
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            if(!mounting){
              setCurrentImg('')
            }
            
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
           setFilePath(source)
          }
        });
      };

    const dispatch = useDispatch();
    const state = useSelector(state => state.editprofileReducer)
    const oninputchange = (type , e) => {
          dispatch({type:'SET_EDITPROFILE' , inputType: type , value : e})
    }
    const saveBtn = async () => {
        const username = await AsyncStorage.getItem('username');
        saveDisplayName(username , state.displayname)
        saveStatusMessage(username , state.statusmessage)
        if(filePath === 'default'){

        }else{
          await storage().ref('images/' + username).putFile(filePath.path).then((snapshot)=>{
           
            
            console.log('image succesfully uploaded!')
          }).catch((e) => {
            console.log('error while uploading => ' + e);
          })
          
        }
        alert('data saved!')
    }
    const isAvailable = () => {
      if (currentImg == ''){
        return  <Image
        source={{
          uri: 'data:image/jpeg;base64,' + filePath.data,
        }}
        style={{ width: 95, height: 95 , borderRadius: 100 }}
      />
      }else{
        return   <Fragment><Image source={currentImg} style = {{width: 95, height: 95 , borderRadius: 100}} />
       <View style={{position:'absolute', justifyContent:'center' ,alignItems:'center',  bottom: 10, right:0, width : 29 , height : 29, borderRadius : 20,backgroundColor : 'rgba(255,255,255,0.4)'}}><Camera width={17} height={17}/></View></Fragment>
      }
    }
    const gotohome = () => {
      navigation.replace('Home')
    }
    return(
        <View style={{flex:1}}>
             <View style={{flex:2, backgroundColor:'rgba(27,176,233,1)' , borderBottomLeftRadius:41, borderBottomRightRadius:41, position:'relative'}}>
             <View style={{position:'relative'}}>
                <View style={{flexDirection : 'row', alignItems: 'center', padding: 16, justifyContent : 'space-between'}}>
                    <TouchableOpacity onPress={gotohome} style={{}}>
                        <LeftLogo width={30} height={30}/>
                    </TouchableOpacity>
                    <Text style={[style.profileHeader , {}]}>Profile</Text>
                    <TouchableOpacity onPress={saveBtn} style={{}}>
                      <Checked width={30} height={30}/>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', position:'relative'}}>
                    <TouchableOpacity onPress={chooseFile} style={{borderWidth:1, height : 95, width: 95, borderRadius: 100, backgroundColor:'#FFFFFF',borderColor:'#707070'}}>
                      {
                        isAvailable()
                      }
                      
                    </TouchableOpacity>
                </View>
                
                   
                </View>
             </View>
             <View style={{flex:3}}>
                <View style={{marginHorizontal:21, marginVertical:35}}>
                        <Text style={{fontSize:14, fontFamily:'ITCKRISTEN'}}>Display Name</Text>
                        <TextInput maxLength={22} onChangeText={(e)=>{oninputchange('displayname', e)}} value={state.displayname} style={{borderBottomWidth:1, height:40, marginBottom:10}}></TextInput>
                        <Text style={{fontSize:14, fontFamily:'ITCKRISTEN'}}>Status Message</Text>
                        <TextInput maxLength={55} onChangeText={(e)=>{oninputchange('statusmessage' , e)}} value={state.statusmessage} style={{borderBottomWidth:1, height:40, marginBottom:10}}></TextInput>
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
    profileHeader : {
        color : '#FFFFFF',
        fontSize : 18,
        fontFamily : 'ITCKRISTEN',
        textAlign : 'center',
        padding : 16,
    },
    camerapicture : {
      width : 25,
      height : 25
    }
})

export default EditProfile;