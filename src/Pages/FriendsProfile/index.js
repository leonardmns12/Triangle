import React from 'react';
import { View , Text, StyleSheet, ScrollView  , Alert, BackHandler, AsyncStorage, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Content from '../../Component/Molekuls/Timeline';
import { useDispatch , useSelector } from 'react-redux';
import LeftLogo from '../../../assets/chatWindow/left.svg';
import ChatIcon from '../../../assets/navigation/comment.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FriendsProfile = ({navigation}) => {
    const gtchat = (screen) => {
        navigation.replace(screen);
    }
    const HomeState = useSelector(state => state.homeReducer)
    const dispatch = useDispatch();

    const GoBacktoHome = () => {
        navigation.replace('Home')
    }

    return(
        <View style={{flex:1}}>
            <View style={[style.header,{}]}>
                <TouchableOpacity onPress={GoBacktoHome} style={{paddingLeft:10, paddingTop:11}}> 
                <LeftLogo height={33} width={33}></LeftLogo>
                </TouchableOpacity>
                <Text style={[style.headerText,{}]}>Profile</Text>
            </View>
            <View style={{flex:0.5, backgroundColor:'#e8e6e6', position:'relative'}}>
              <View style={{position:'relative'}}>
                <View style={{flexDirection:'row',marginTop:5, marginBottom:7}}>
                    <View style={[style.profileimg ,{}]}></View>
                    <Text style={[style.profilename, {}]}>Nico</Text>
                </View>
                <View style={{width:220, marginBottom: 50}}>
                    <Text style={[style.bio , {}]}>Better</Text>
                </View>
                <TouchableOpacity style={{flexDirection: 'row', width:100, height:30, backgroundColor:'#1BB0DF', marginLeft:140, borderRadius:50, shadowOpacity:1}}>
                    <View style={{marginLeft:10,paddingTop:4}}>
                    <Icon name='message' color='#FFFFFF' size={20} />
                    </View>
                    <Text style={{marginLeft: 10, paddingTop:4, fontFamily:'ITCKRISTEN', color:'#FFFFFF'}}>
                        Chat
                    </Text>
                </TouchableOpacity>
               </View>
            </View>
            <View style={{flex:1}}>
            <ScrollView>
            <View> 
                <Content visible = {'block'} />
                <Content visible = {'none'} profilename={'Leonard'} commentcount={'2'} time={'17:20'} content={'111'}/>
                <Content visible = {'block'} profilename={'Leonard'} commentcount={'2'} time={'17:20'} content={'12312312312'}/>
            </View>
            </ScrollView>
            </View>
            <View style={{}}>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        height : 55,
        backgroundColor : '#1BB0DF',
        flexDirection : 'row'
    },
    headerText: {
        fontSize : 20,
        fontFamily : 'ITCKRISTEN',
        color : '#000000',
        paddingTop : 15,
        marginLeft: '10%',
    },
    profileimg : {
        width: 50,
        backgroundColor: '#FFFFFF',
        height: 50,
        marginLeft: 12,
        borderRadius: 100,
        borderColor: '#707070',
        borderWidth: 1
    },
    profilename : {
        fontSize: 16,
        color: '#000000',
        marginTop: 12,
        paddingHorizontal:15
    },
    bio: {
        marginLeft: 12,
        color: '#000000',
    },
    headerText: {
        fontSize : 20,
        fontFamily : 'ITCKRISTEN',
        color : '#FFFFFF',
        paddingTop : 15,
        marginLeft: '30%',
    },
})

export default FriendsProfile;