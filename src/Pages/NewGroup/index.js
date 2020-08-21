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

const NewGroup= ({navigation}) => {

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
          }
        });
      };
 
    return(
        <View style={{flex:1}}>
             <View style={{flex:2, backgroundColor:'rgba(27,176,233,1)' , borderBottomLeftRadius:41, borderBottomRightRadius:41, position:'relative'}}>
             <View style={{position:'relative'}}>
                <View style={{flexDirection : 'row', alignItems: 'center', padding: 16, justifyContent : 'space-between'}}>
                    <TouchableOpacity style={{}}>
                        <LeftLogo width={30} height={30}/>
                    </TouchableOpacity>
                    <Text style={[style.Header , {}]}>New Group</Text>
                    <TouchableOpacity style={{}}>
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
                        <Text style={{fontSize:14, fontFamily:'ITCKRISTEN'}}>Group Name</Text>
                        <TextInput maxLength={22} onChangeText={(e)=>{oninputchange('displayname', e)}} style={{borderBottomWidth:1, height:40, marginBottom:10}}></TextInput>
                        <Text>Choose Friend</Text>
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
    }
})

export default NewGroup;