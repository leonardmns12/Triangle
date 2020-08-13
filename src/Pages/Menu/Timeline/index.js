import React , { useState } from 'react';
import { View , Text, TouchableOpacity , StyleSheet ,ScrollView} from 'react-native';
import NavigationMenu from '../../../Component/Molekuls/NavigationMenu/';
import LeftLogo from '../../../../assets/chatWindow/left.svg';
import Contents from '../../../Component/Molekuls/Timeline';
import {ContentPicture} from '../../../Component/Atoms'

const Timeline = ({navigation}) => {
const gtchat = (screen) => {
    navigation.replace(screen);
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
            <Text style={[styles.timelinetext,{}]}>Friend With Something News</Text>
        <View style={{width:310, borderWidth:1 , marginHorizontal: 18 }}>
        </View>
        <ScrollView>
            <View> 
                <Contents visible = {'block'} />
                <Contents visible = {'none'} profilename={'Leonard'} commentcount={'2'} time={'17:20'} content={'111'}/>
                <Contents visible = {'block'} profilename={'Leonard'} commentcount={'2'} time={'17:20'} content={'12312312312'}/>
            </View>
        </ScrollView>
        </View>
        <View>
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